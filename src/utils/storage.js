import { db } from '../config/firebase';
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    writeBatch
} from 'firebase/firestore';

const COLLECTION_NAME = 'cars';
const INVENTORY_CACHE_TTL = 5 * 60 * 1000;
const INVENTORY_LIMIT = 100;
const INVENTORY_SESSION_CACHE_KEY = 'vertex_inventory_cache';
const INVENTORY_CHANGED_EVENT = 'vertex_inventory_changed';
const FALLBACK_IMAGE = 'https://placehold.co/800x600/111827/ffffff?text=Vehicle';
const ALLOWED_IMAGE_PROTOCOLS = new Set(['https:']);
let inventoryCache = null;
let inventoryCacheTime = 0;
let inventoryRequest = null;

const safeString = (value) => (typeof value === 'string' ? value.trim() : '');
const safeNumber = (value, fallback = 0) => {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : fallback;
};

const isSafeImageUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        return ALLOWED_IMAGE_PROTOCOLS.has(parsedUrl.protocol);
    } catch {
        return false;
    }
};

const normalizeImages = (images) => {
    if (!Array.isArray(images)) {
        return [FALLBACK_IMAGE];
    }

    const safeImages = images
        .filter((url) => typeof url === 'string')
        .map((url) => url.trim())
        .filter(isSafeImageUrl);

    return safeImages.length > 0 ? safeImages : [FALLBACK_IMAGE];
};

const normalizeFeatures = (features) => {
    if (!Array.isArray(features)) {
        return [];
    }

    return features
        .filter((feature) => typeof feature === 'string')
        .map((feature) => feature.trim())
        .filter(Boolean);
};

const normalizeCar = (id, car) => ({
    id,
    name: safeString(car.name),
    brand: safeString(car.brand),
    model: safeString(car.model),
    year: safeNumber(car.year, new Date().getFullYear()),
    price: safeNumber(car.price),
    mileage: safeNumber(car.mileage),
    fuelType: safeString(car.fuelType),
    transmission: safeString(car.transmission),
    grade: safeString(car.grade),
    engineCapacity: safeString(car.engineCapacity),
    color: safeString(car.color),
    location: safeString(car.location),
    description: safeString(car.description),
    features: normalizeFeatures(car.features),
    images: normalizeImages(car.images)
});

const validateCarForWrite = (car) => {
    const requiredStrings = ['name', 'brand', 'model', 'fuelType', 'transmission', 'grade', 'engineCapacity', 'color', 'location'];
    const missingString = requiredStrings.find((field) => !safeString(car[field]));

    if (missingString) {
        throw new Error(`Missing required field: ${missingString}`);
    }

    if (!Number.isInteger(car.year) || car.year < 1900 || car.year > new Date().getFullYear() + 1) {
        throw new Error('Year must be a valid vehicle year.');
    }

    if (!Number.isInteger(car.price) || car.price < 0) {
        throw new Error('Price must be a positive number.');
    }

    if (!Number.isInteger(car.mileage) || car.mileage < 0) {
        throw new Error('Mileage must be a positive number.');
    }

    if (!Array.isArray(car.images) || car.images.length === 0 || !car.images.every(isSafeImageUrl)) {
        throw new Error('Images must be valid HTTPS URLs.');
    }

    if (!Array.isArray(car.features) || !car.features.every((feature) => typeof feature === 'string')) {
        throw new Error('Features must be a list of text values.');
    }
};

const prepareCarForWrite = (car) => {
    const carData = normalizeCar(car.id || '', car);
    delete carData.id;
    validateCarForWrite(carData);
    return carData;
};

const isInventoryCacheFresh = () => (
    inventoryCache && Date.now() - inventoryCacheTime < INVENTORY_CACHE_TTL
);

const readStoredInventoryCache = () => {
    if (typeof sessionStorage === 'undefined') {
        return null;
    }

    try {
        const cachedValue = sessionStorage.getItem(INVENTORY_SESSION_CACHE_KEY);
        if (!cachedValue) {
            return null;
        }

        const parsedCache = JSON.parse(cachedValue);
        if (!Array.isArray(parsedCache.cars) || Date.now() - parsedCache.time >= INVENTORY_CACHE_TTL) {
            sessionStorage.removeItem(INVENTORY_SESSION_CACHE_KEY);
            return null;
        }

        return parsedCache;
    } catch {
        sessionStorage.removeItem(INVENTORY_SESSION_CACHE_KEY);
        return null;
    }
};

const getFreshInventoryCache = () => {
    if (isInventoryCacheFresh()) {
        return inventoryCache;
    }

    const storedCache = readStoredInventoryCache();
    if (storedCache) {
        inventoryCache = storedCache.cars;
        inventoryCacheTime = storedCache.time;
        return inventoryCache;
    }

    return null;
};

const setInventoryCache = (cars) => {
    inventoryCache = cars;
    inventoryCacheTime = Date.now();

    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(INVENTORY_SESSION_CACHE_KEY, JSON.stringify({
            time: inventoryCacheTime,
            cars
        }));
    }
};

const clearInventoryCache = () => {
    inventoryCache = null;
    inventoryCacheTime = 0;
    inventoryRequest = null;

    if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem(INVENTORY_SESSION_CACHE_KEY);
    }
};

const notifyInventoryChanged = () => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(INVENTORY_CHANGED_EVENT));
    }
};

export const getCachedCars = () => getFreshInventoryCache() || [];

const getCarsQuery = () => query(
    collection(db, COLLECTION_NAME),
    orderBy('year', 'desc'),
    limit(INVENTORY_LIMIT)
);

export const subscribeToCars = (onCarsChange, onError) => {
    const cachedCars = getFreshInventoryCache();
    if (cachedCars) {
        onCarsChange(cachedCars);
    }

    return onSnapshot(
        getCarsQuery(),
        (querySnapshot) => {
            const cars = querySnapshot.docs.map((documentSnapshot) => normalizeCar(documentSnapshot.id, documentSnapshot.data()));
            setInventoryCache(cars);
            onCarsChange(cars);
        },
        (error) => {
            console.error("Error subscribing to cars: ", error);
            if (onError) {
                onError(error);
            }
        }
    );
};

// Get all cars (Async)
export const getCars = async ({ forceRefresh = false } = {}) => {
    if (!forceRefresh) {
        const cachedCars = getFreshInventoryCache();
        if (cachedCars) {
            return cachedCars;
        }
    }

    if (!forceRefresh && inventoryRequest) {
        return inventoryRequest;
    }

    inventoryRequest = (async () => {
        const querySnapshot = await getDocs(getCarsQuery());
        const cars = querySnapshot.docs.map((documentSnapshot) => normalizeCar(documentSnapshot.id, documentSnapshot.data()));
        setInventoryCache(cars);
        return cars;
    })();

    try {
        return await inventoryRequest;
    } catch (error) {
        console.error("Error getting cars: ", error);
        return [];
    } finally {
        inventoryRequest = null;
    }
};

// Get car by ID (Async)
export const getCarById = async (id) => {
    if (isInventoryCacheFresh()) {
        const cachedCar = inventoryCache.find((car) => car.id === id);
        if (cachedCar) {
            return cachedCar;
        }
    }

    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const car = normalizeCar(docSnap.id, docSnap.data());
            if (isInventoryCacheFresh()) {
                setInventoryCache([
                    ...inventoryCache.filter((cachedCar) => cachedCar.id !== id),
                    car
                ]);
            }
            return car;
        }
        return null;
    } catch (error) {
        console.error("Error getting car: ", error);
        return null;
    }
};

// Add new car (Async)
export const addCar = async (car) => {
    try {
        const carData = prepareCarForWrite(car);
        const docRef = await addDoc(collection(db, COLLECTION_NAME), carData);
        clearInventoryCache();
        notifyInventoryChanged();
        return { id: docRef.id, ...carData };
    } catch (error) {
        console.error("Error adding car: ", error);
        throw error;
    }
};

// Update car (Async)
export const updateCar = async (id, updatedCar) => {
    try {
        const carData = prepareCarForWrite(updatedCar);
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, carData);
        clearInventoryCache();
        notifyInventoryChanged();
        return { id, ...carData };
    } catch (error) {
        console.error("Error updating car: ", error);
        throw error;
    }
};

// Delete car (Async)
export const deleteCar = async (id) => {
    if (!id) {
        throw new Error("Cannot delete car: No ID provided");
    }
    try {
        const stringId = id.toString();
        const docRef = doc(db, COLLECTION_NAME, stringId);
        await deleteDoc(docRef);
        clearInventoryCache();
        notifyInventoryChanged();
        console.log(`Successfully deleted car with ID: ${stringId}`);
    } catch (error) {
        console.error("Error in deleteCar utility:", error);
        throw error;
    }
};

// Delete all cars (Async)
export const deleteCars = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        if (querySnapshot.empty) {
            console.log("No cars to delete.");
            return;
        }
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        clearInventoryCache();
        notifyInventoryChanged();
        console.log(`Successfully deleted ${querySnapshot.size} cars.`);
    } catch (error) {
        console.error("Error in deleteCars utility:", error);
        throw error;
    }
};

// Search and filter cars (Async)
export const filterCars = async (filters) => {
    let cars = await getCars();

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        cars = cars.filter(car =>
            (car.name || "").toLowerCase().includes(searchLower) ||
            (car.brand || "").toLowerCase().includes(searchLower) ||
            (car.model || "").toLowerCase().includes(searchLower)
        );
    }

    if (filters.brand) {
        cars = cars.filter(car => car.brand === filters.brand);
    }

    if (filters.fuelType) {
        cars = cars.filter(car => car.fuelType === filters.fuelType);
    }

    if (filters.transmission) {
        cars = cars.filter(car => car.transmission === filters.transmission);
    }

    if (filters.minPrice) {
        cars = cars.filter(car => car.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
        cars = cars.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    if (filters.minYear) {
        cars = cars.filter(car => car.year >= parseInt(filters.minYear));
    }

    if (filters.maxYear) {
        cars = cars.filter(car => car.year <= parseInt(filters.maxYear));
    }

    return cars;
};

// Get unique values for filters (Async)
export const getFilterOptions = async () => {
    const cars = await getCars();
    return {
        brands: [...new Set(cars.map(car => car.brand))].sort(),
        fuelTypes: [...new Set(cars.map(car => car.fuelType))].sort(),
        transmissions: [...new Set(cars.map(car => car.transmission))].sort(),
        years: [...new Set(cars.map(car => car.year))].sort((a, b) => b - a)
    };
};

// Format price in LKR
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

// Format mileage
export const formatMileage = (mileage) => {
    return `${(mileage || 0).toLocaleString()} km`;
};
