import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Palette, Star, Gauge, Wrench, Fuel, MapPin } from 'lucide-react';
import { getCarById, formatMileage } from '../utils/storage';
import './CarDetail.css';

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCar = async () => {
            setIsLoading(true);
            try {
                const loadedCar = await getCarById(id);
                if (loadedCar) {
                    setCar(loadedCar);
                }
            } catch (error) {
                console.error("Error loading car details:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadCar();
    }, [id]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading car details...</p>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="not-found">
                <div className="container">
                    <div className="not-found-content">
                        <h1>Car Not Found</h1>
                        <p>The car you're looking for doesn't exist or has been sold.</p>
                        <Link to="/" className="btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="car-detail">
            <div className="container">
                {/* Main Content - Single Row Layout */}
                <div className="detail-content">
                    {/* Left: Image Gallery */}
                    <div className="gallery-section">
                        <div className="main-image-wrapper">
                            <img
                                src={car.images[selectedImage]}
                                alt={car.name}
                                className="main-image"
                            />
                        </div>

                        {car.images.length > 1 && (
                            <div className="thumbnail-grid">
                                {car.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    >
                                        <img src={image} alt={`${car.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Vehicle Information */}
                    <div className="info-section">
                        <h1 className="car-name">{car.brand} {car.model}</h1>

                        {/* Specifications */}
                        <div className="specs-list">
                            <div className="spec-item">
                                <Calendar className="spec-icon" size={20} />
                                <span className="spec-label">Year:</span>
                                <span className="spec-value">{car.year}</span>
                            </div>
                            <div className="spec-item">
                                <Palette className="spec-icon" size={20} />
                                <span className="spec-label">Color:</span>
                                <span className="spec-value">{car.color}</span>
                            </div>
                            <div className="spec-item">
                                <Star className="spec-icon" size={20} />
                                <span className="spec-label">Grade:</span>
                                <span className="spec-value">{car.grade}</span>
                            </div>
                            <div className="spec-item">
                                <Gauge className="spec-icon" size={20} />
                                <span className="spec-label">Mileage:</span>
                                <span className="spec-value">{formatMileage(car.mileage)}</span>
                            </div>
                            <div className="spec-item">
                                <Wrench className="spec-icon" size={20} />
                                <span className="spec-label">Engine:</span>
                                <span className="spec-value">{car.engineCapacity}</span>
                            </div>
                            <div className="spec-item">
                                <Fuel className="spec-icon" size={20} />
                                <span className="spec-label">Fuel:</span>
                                <span className="spec-value">{car.fuelType}</span>
                            </div>
                            <div className="spec-item">
                                <MapPin className="spec-icon" size={20} />
                                <span className="spec-label">Location:</span>
                                <span className="spec-value">{car.location}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="description-section">
                            <h2 className="section-heading">Description</h2>
                            <p className="description-text">{car.description}</p>
                        </div>

                        {/* Features */}
                        <div className="features-section">
                            <h2 className="section-heading">Features</h2>
                            <div className="features-list">
                                {car.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <span className="feature-check">✓</span>
                                        <span className="feature-text">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <a href="tel:+94112345678" className="btn-primary">
                                📞 Call Now
                            </a>
                            <a
                                href={`https://wa.me/94771234567?text=Hi, I'm interested in ${car.name} (${car.year})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                💬 WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
