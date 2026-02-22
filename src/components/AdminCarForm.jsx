import React, { useState, useEffect } from 'react';
import { addCar, updateCar } from '../utils/storage';
import { X, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import './AdminCarForm.css';

const AdminCarForm = ({ car, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        price: '',
        mileage: '',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        grade: 'Excellent',
        engineCapacity: '',
        color: '',
        location: 'Colombo',
        description: '',
        features: [],
        images: []
    });

    const [newFeature, setNewFeature] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');

    useEffect(() => {
        if (car) {
            setFormData({
                ...car,
                price: car.price.toString(),
                mileage: car.mileage.toString()
            });
        }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddFeature = (e) => {
        e.preventDefault();
        if (newFeature.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, newFeature.trim()]
            }));
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleAddImage = (e) => {
        e.preventDefault();
        if (newImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, newImageUrl.trim()]
            }));
            setNewImageUrl('');
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.name === 'newFeature') {
            e.preventDefault();
            handleAddFeature(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.brand || !formData.model || !formData.price || !formData.mileage || (formData.images.length === 0 && !newImageUrl)) {
            alert('Please fill in all required fields and add at least one image.');
            return;
        }

        // Auto-generate name if not provided
        const carName = formData.name || `${formData.brand} ${formData.model}`;

        // Include any pending feature or image URL
        let finalFeatures = [...formData.features];
        if (newFeature.trim()) {
            finalFeatures.push(newFeature.trim());
        }

        let finalImages = [...formData.images];
        if (newImageUrl.trim()) {
            finalImages.push(newImageUrl.trim());
        }

        const processedData = {
            ...formData,
            name: carName,
            price: parseInt(formData.price) || 0,
            mileage: parseInt(formData.mileage) || 0,
            year: parseInt(formData.year) || new Date().getFullYear(),
            engineCapacity: formData.engineCapacity.toString(),
            features: finalFeatures,
            images: finalImages
        };

        try {
            if (car) {
                await updateCar(car.id, processedData);
            } else {
                await addCar(processedData);
            }
            onSubmit();
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to save vehicle details. Please check your Firebase rules.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="admin-form-container">
                <header className="form-header">
                    <h2>{car ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
                    <button className="btn-close" onClick={onClose}><X size={24} /></button>
                </header>

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-section">
                            <h3>Basic Information</h3>
                            <div className="input-group">
                                <label>Brand</label>
                                <input required name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Toyota" />
                            </div>
                            <div className="input-group">
                                <label>Model</label>
                                <input required name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Corolla" />
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Year</label>
                                    <input required type="number" name="year" value={formData.year} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Price (LKR)</label>
                                    <input required type="number" name="price" value={formData.price} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Mileage (km)</label>
                                    <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} />
                                </div>
                                <div className="input-group">
                                    <label>Grade</label>
                                    <input required name="grade" value={formData.grade} onChange={handleChange} placeholder="e.g. 4.5 or Excellent" />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Engine Capacity</label>
                                <input required name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} placeholder="e.g. 1500cc" />
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Fuel Type</label>
                                    <select name="fuelType" value={formData.fuelType} onChange={handleChange}>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Transmission</label>
                                    <select name="transmission" value={formData.transmission} onChange={handleChange}>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Manual">Manual</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-row">
                                <div className="input-group">
                                    <label>Color</label>
                                    <input required name="color" value={formData.color} onChange={handleChange} placeholder="e.g. White Pearl" />
                                </div>
                                <div className="input-group">
                                    <label>Location</label>
                                    <input required name="location" value={formData.location} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>Images & Media</h3>
                            <div className="image-input-area">
                                <div className="input-group">
                                    <label>Image URL</label>
                                    <div className="input-with-btn">
                                        <input
                                            value={newImageUrl}
                                            onChange={(e) => setNewImageUrl(e.target.value)}
                                            placeholder="Paste image URL here..."
                                        />
                                        <button type="button" onClick={handleAddImage} className="btn-add-item"><Plus size={20} /></button>
                                    </div>
                                </div>
                                <div className="image-preview-grid">
                                    {formData.images.map((url, index) => (
                                        <div key={index} className="image-preview-item">
                                            <img src={url} alt={`Preview ${index}`} />
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="btn-remove-img"><X size={14} /></button>
                                        </div>
                                    ))}
                                    {formData.images.length === 0 && (
                                        <div className="image-placeholder">
                                            <ImageIcon size={32} />
                                            <span>No images added</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3>Features</h3>
                            <div className="features-input-area">
                                <div className="input-with-btn">
                                    <input
                                        name="newFeature"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add a feature (e.g. Push Start)"
                                    />
                                    <button type="button" onClick={handleAddFeature} className="btn-add-item"><Plus size={20} /></button>
                                </div>
                                <div className="features-tags">
                                    {formData.features.map((feature, index) => (
                                        <span key={index} className="feature-tag">
                                            {feature}
                                            <button type="button" onClick={() => handleRemoveFeature(index)}><X size={12} /></button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h3>Description</h3>
                            <div className="input-group">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Tell buyers about this vehicle..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <footer className="form-footer">
                        <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                        <button type="submit" className="btn-submit">
                            {car ? 'Update Vehicle' : 'Add Vehicle'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AdminCarForm;
