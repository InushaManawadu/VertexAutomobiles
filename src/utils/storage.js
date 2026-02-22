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
    where,
    writeBatch
} from 'firebase/firestore';

const COLLECTION_NAME = 'cars';

// Get all cars (Async)
export const getCars = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting cars: ", error);
        return [];
    }
};

// Get car by ID (Async)
export const getCarById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
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
        const docRef = await addDoc(collection(db, COLLECTION_NAME), car);
        return { id: docRef.id, ...car };
    } catch (error) {
        console.error("Error adding car: ", error);
        throw error;
    }
};

// Update car (Async)
export const updateCar = async (id, updatedCar) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, updatedCar);
        return { id, ...updatedCar };
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
