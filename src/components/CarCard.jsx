import { Link } from 'react-router-dom';
import { Gauge, Wrench, Fuel, MapPin, ArrowRight } from 'lucide-react';
import { formatMileage, formatPrice } from '../utils/storage';
import './CarCard.css';

const CarCard = ({ car }) => {
    return (
        <Link to={`/car/${car.id}`} className="car-card">
            <div className="car-card-image-wrapper">
                <img
                    src={car.images[0]}
                    alt={car.name}
                    className="car-card-image"
                    loading="lazy"
                    decoding="async"
                />
                <div className="car-card-year">{car.year}</div>
            </div>

            <div className="car-card-content">
                <div className="car-card-main">
                    <div className="car-card-title-block">
                        <h3 className="car-card-title">{car.brand} {car.model}</h3>
                        <p className="car-card-location">
                            <MapPin size={14} />
                            {car.location}
                        </p>
                    </div>

                    <ul className="car-card-specs">
                        <li className="car-card-spec">
                            <Gauge className="spec-icon" size={18} />
                            <span>{formatMileage(car.mileage)}</span>
                        </li>
                        <li className="car-card-spec">
                            <Wrench className="spec-icon" size={18} />
                            <span>{car.engineCapacity}</span>
                        </li>
                        <li className="car-card-spec">
                            <Fuel className="spec-icon" size={18} />
                            <span>{car.fuelType}</span>
                        </li>
                    </ul>

                    <div className="car-card-meta">
                        <span>{car.grade}</span>
                        <span>{car.transmission}</span>
                        <span>{car.color}</span>
                    </div>
                </div>

                <div className="car-card-side">
                    <span className="car-card-price">{formatPrice(car.price)}</span>
                    <span className="car-card-view">
                        View Details
                        <ArrowRight size={16} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default CarCard;
