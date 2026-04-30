import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, Gauge, MessageCircle, Phone, Palette, Star, Wrench, Fuel, MapPin } from 'lucide-react';
import { getCarById, formatMileage, formatPrice } from '../utils/storage';
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

    const whatsappMessage = encodeURIComponent(`Hi, I'm interested in ${car.brand} ${car.model} (${car.year}).`);
    const specs = [
        { label: 'Year', value: car.year, icon: Calendar },
        { label: 'Mileage', value: formatMileage(car.mileage), icon: Gauge },
        { label: 'Engine', value: car.engineCapacity, icon: Wrench },
        { label: 'Fuel', value: car.fuelType, icon: Fuel },
        { label: 'Grade', value: car.grade, icon: Star },
        { label: 'Color', value: car.color, icon: Palette },
        { label: 'Transmission', value: car.transmission, icon: Wrench },
        { label: 'Location', value: car.location, icon: MapPin }
    ];

    return (
        <div className="car-detail">
            <div className="container">
                <Link to="/stock" className="back-link">
                    <ArrowLeft size={18} />
                    Back to stock
                </Link>

                <div className="detail-content">
                    <div className="gallery-section">
                        <div className="main-image-wrapper">
                            <img
                                src={car.images[selectedImage]}
                                alt={car.name}
                                className="main-image"
                                loading="eager"
                            />
                        </div>

                        {car.images.length > 1 && (
                            <div className="thumbnail-grid">
                                {car.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        aria-label={`View image ${index + 1}`}
                                    >
                                        <img src={image} alt={`${car.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <aside className="vehicle-summary-card">
                        <p className="detail-kicker">{car.year} Vehicle</p>
                        <h1 className="car-name">{car.brand} {car.model}</h1>
                        <p className="detail-location">
                            <MapPin size={16} />
                            {car.location}
                        </p>

                        <div className="detail-price-block">
                            <span className="price-label">Price</span>
                            <span className="detail-price">{formatPrice(car.price)}</span>
                        </div>

                        <div className="summary-spec-grid">
                            {specs.slice(0, 6).map((spec) => {
                                const SpecIcon = spec.icon;

                                return (
                                    <div className="summary-spec" key={spec.label}>
                                        <SpecIcon className="spec-icon" size={18} />
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="summary-actions">
                        <a href="tel:+94767262633" className="btn btn-primary">
                            <Phone size={18} />
                            Call Now
                        </a>
                        <a
                            href={`https://wa.me/94767262633?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                        </div>
                    </aside>
                </div>

                <div className="detail-lower-grid">
                    <section className="detail-panel">
                        <h2 className="section-heading">All Specifications</h2>
                        <div className="specs-grid">
                            {specs.map((spec) => {
                                const SpecIcon = spec.icon;

                                return (
                                    <div className="spec-card" key={spec.label}>
                                        <SpecIcon className="spec-icon" size={20} />
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="detail-panel">
                        <div className="description-section">
                            <h2 className="section-heading">Description</h2>
                            <p className="description-text">{car.description || 'Contact us for more details about this vehicle.'}</p>
                        </div>

                        {car.features.length > 0 && (
                            <div className="features-section">
                            <h2 className="section-heading">Features</h2>
                            <div className="features-list">
                                {car.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <CheckCircle2 className="feature-check" size={18} />
                                        <span className="feature-text">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CarDetail;
