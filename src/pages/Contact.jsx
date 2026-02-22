import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a server
        console.log('Form submitted:', formData);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <div className="contact">
            <div className="container">
                {/* Hero Section */}
                <section className="contact-hero">
                    <h1 className="page-title">Get In Touch</h1>
                    <p className="page-subtitle">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </section>

                <div className="contact-grid">
                    {/* Contact Form */}
                    <div className="form-section">
                        <div className="form-card">
                            <h2>Send Us a Message</h2>

                            {isSubmitted ? (
                                <div className="success-message">
                                    <div className="success-icon">✓</div>
                                    <h3>Thank You!</h3>
                                    <p>Your message has been received. We'll get back to you soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+94 XX XXX XXXX"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn-primary submit-btn">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="info-section">
                        <div className="info-card">
                            <h2>Contact Information</h2>
                            <p className="info-description">
                                Reach out to us through any of these channels. We're here to help!
                            </p>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="method-details">
                                        <h3>WhatsApp</h3>
                                        <a href="https://wa.me/94767262633" target="_blank" rel="noopener noreferrer">+94 76 726 2633</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-details">
                                        <h3>Email</h3>
                                        <a href="mailto:vertexautomobile26@gmail.com">vertexautomobile26@gmail.com</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-details">
                                        <h3>Address</h3>
                                        <p>Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
