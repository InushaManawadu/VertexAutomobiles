import { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { subscribeToCars } from '../utils/storage';
import './Stock.css';

const Stock = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToCars(
            (updatedCars) => {
                setCars(updatedCars);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error loading cars:", error);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    return (
        <div className="stock">
            {/* Cars Grid */}
            <section className="cars-section">
                <div className="container">
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
