import React, { useState, useEffect } from 'react';
import { getCars, deleteCar, deleteCars, formatPrice } from '../utils/storage';
import AdminCarForm from '../components/AdminCarForm';
import { Plus, Edit2, Trash2, LogOut, ChevronRight } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [cars, setCars] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCar, setEditingCar] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const ACCESS_KEY = 'admin123';

    useEffect(() => {
        const authStatus = sessionStorage.getItem('admin_auth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            loadCars();
        }
    }, []);

    const loadCars = async () => {
        setIsLoading(true);
        try {
            const data = await getCars();
            setCars(data);
        } catch (err) {
            console.error("Failed to load cars", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ACCESS_KEY) {
            setIsAuthenticated(true);
            setError('');
            sessionStorage.setItem('admin_auth', 'true');
            loadCars();
        } else {
            setError('Invalid access key. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
    };

    const handleDelete = async (id) => {
        console.log("Delete request received for ID:", id);

        // Use window.confirm but wrapped to ensure logic continues if it's "blocked" or "auto-accepted"
        const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
        if (confirmDelete) {
            setIsLoading(true);
            try {
                await deleteCar(id);
                console.log("Delete operation finished successfully in storage.");
                await loadCars();
            } catch (err) {
                console.error("Deletion failed:", err);
                alert(`Error deleting vehicle: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("Delete action cancelled by user.");
        }
    };

    const handleClearAll = async (e) => {
        if (e) e.preventDefault();
        console.log("Clear All request received");

        const confirmClear = window.confirm('Are you sure you want to delete ALL vehicles? This cannot be undone.');
        if (confirmClear) {
            setIsLoading(true);
            try {
                await deleteCars();
                console.log("Clear All operation finished successfully in storage.");
                await loadCars();
            } catch (err) {
                console.error("Clear all failed:", err);
                alert(`Error clearing inventory: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log("Clear All action cancelled by user.");
        }
    };

    const handleEdit = (car) => {
        setEditingCar(car);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingCar(null);
        setIsFormOpen(true);
    };

    const handleFormSubmit = () => {
        setIsFormOpen(false);
        loadCars();
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-card">
                    <div className="login-header">
                        <span className="login-icon">🔐</span>
                        <h1>Admin Access</h1>
                        <p>Please enter your access key to manage inventory</p>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Access Key"
                                autoFocus
                            />
                            {error && <span className="error-message">{error}</span>}
                        </div>
                        <button type="submit" className="btn-login">
                            Login <ChevronRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                <header className="admin-header">
                    <div className="header-left">
                        <h1>Inventory Management</h1>
                        <p>Total Vehicles: {cars.length}</p>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleAddNew} className="btn-add">
                            <Plus size={20} /> Add New Vehicle
                        </button>
                        <button onClick={handleClearAll} className="btn-clear-all" title="Clear All Vehicles">
                            <Trash2 size={20} /> Clear All
                        </button>
                        <button onClick={handleLogout} className="btn-logout" title="Logout">
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {isLoading ? (
                        <div className="loading-state">
                            <p>Loading inventory...</p>
                        </div>
                    ) : (
                        <div className="inventory-table-wrapper">
                            <table className="inventory-table">
                                <thead>
                                    <tr>
                                        <th>Vehicle</th>
                                        <th>Year</th>
                                        <th>Grade</th>
                                        <th>Price</th>
                                        <th>Mileage</th>
                                        <th>Fuel</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-secondary)' }}>
                                                No vehicles found in inventory.
                                            </td>
                                        </tr>
                                    ) : (
                                        cars.map((car) => (
                                            <tr key={car.id}>
                                                <td>
                                                    <div className="car-info-cell">
                                                        <img src={car.images[0]} alt={car.name} className="table-car-img" />
                                                        <div className="car-name-info">
                                                            <span className="car-brand">{car.brand}</span>
                                                            <span className="car-model">{car.model}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{car.year}</td>
                                                <td>{car.grade}</td>
                                                <td>{formatPrice(car.price)}</td>
                                                <td>{car.mileage?.toLocaleString()} km</td>
                                                <td>{car.fuelType}</td>
                                                <td>{car.location}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn-icon btn-edit"
                                                            onClick={() => handleEdit(car)}
                                                            title="Edit"
                                                        >
                                                            <Edit2 size={18} />
                                                        </button>
                                                        <button
                                                            className="btn-icon btn-delete"
                                                            onClick={() => handleDelete(car.id)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {isFormOpen && (
                <AdminCarForm
                    car={editingCar}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};

export default Admin;
