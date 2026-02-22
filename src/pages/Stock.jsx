import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { getCars } from '../utils/storage';
import './Stock.css';

const Stock = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCars = async () => {
            setIsLoading(true);
            try {
                const loadedCars = await getCars();
                setCars(loadedCars);
            } catch (error) {
                console.error("Error loading cars:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCars();
    }, []);

    return (
        <div className="stock">
            {/* Hero Section */}
            <section className="stock-hero">
                <div className="container">
                    <h1 className="page-title">Our Stock</h1>
                    <p className="page-subtitle">
                        Browse our collection of quality pre-owned vehicles
                    </p>
                </div>
            </section>

            {/* Cars Grid */}
            <section className="cars-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Available Cars</h2>
                        <p className="section-subtitle">
                            {cars.length} {cars.length === 1 ? 'car' : 'cars'} available
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading cars...</p>
                        </div>
                    ) : cars.length > 0 ? (
                        <div className="cars-grid">
                            {cars.map(car => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <h3>No cars available</h3>
                            <p>Check back soon for new inventory</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Stock;
