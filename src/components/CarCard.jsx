import { Link } from 'react-router-dom';
import { Calendar, Palette, Star, Gauge, Wrench, Fuel } from 'lucide-react';
import { formatMileage } from '../utils/storage';
import './CarCard.css';

const CarCard = ({ car }) => {
    return (
        <Link to={`/car/${car.id}`} className="car-card">
            <h3 className="car-card-title">{car.brand} {car.model}</h3>

            <div className="car-card-body">
                <div className="car-card-image-wrapper">
                    <img
                        src={car.images[0]}
                        alt={car.name}
                        className="car-card-image"
                        loading="lazy"
                    />
                </div>

                <ul className="car-card-specs">
                    <li className="car-card-spec">
                        <Calendar className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Year:</span>
                            <span className="spec-value">{car.year}</span>
                        </span>
                    </li>
                    <li className="car-card-spec">
                        <Palette className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Color:</span>
                            <span className="spec-value">{car.color}</span>
                        </span>
                    </li>
                    <li className="car-card-spec">
                        <Star className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Grade:</span>
                            <span className="spec-value">{car.grade}</span>
                        </span>
                    </li>
                    <li className="car-card-spec">
                        <Gauge className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Mileage:</span>
                            <span className="spec-value">{formatMileage(car.mileage)}</span>
                        </span>
                    </li>
                    <li className="car-card-spec">
                        <Wrench className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Engine:</span>
                            <span className="spec-value">{car.engineCapacity}</span>
                        </span>
                    </li>
                    <li className="car-card-spec">
                        <Fuel className="spec-icon" size={20} />
                        <span className="spec-text">
                            <span className="spec-label">Fuel:</span>
                            <span className="spec-value">{car.fuelType}</span>
                        </span>
                    </li>
                </ul>
            </div>
        </Link>
    );
};

export default CarCard;
