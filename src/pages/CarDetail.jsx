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
                        <Link to="/" className="btn btn-primary">
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
                            <a href="tel:+94767262633" className="btn btn-primary">
                                📞 Call Now
                            </a>
                            <a
                                href={`https://wa.me/94767262633?text=Hi, I'm interested in ${car.brand} ${car.model} (${car.year})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary"
                            >
                                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px' }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
