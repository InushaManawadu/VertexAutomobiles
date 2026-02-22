import { useEffect, useRef } from 'react';
import './ImportProcess.css';

const ImportProcess = () => {
    const observerRef = useRef(null);

    const steps = [
        {
            number: 1,
            title: "Requirement Gathering & Price Estimation",
            description: "Share your vehicle preferences and budget — we'll provide a detailed price estimation tailored to your requirements"
        },
        {
            number: 2,
            title: "Payment & Bidding",
            description: "Make an advanced payment to start the auction bidding process or reserve from available stock"
        },
        {
            number: 3,
            title: "Proforma Invoice",
            description: "Proforma invoice issued with complete vehicle and pricing details"
        },
        {
            number: 4,
            title: "Open LC",
            description: "Letter of Credit opened to secure the transaction"
        },
        {
            number: 5,
            title: "Shipment Arrangement",
            description: "Vehicle prepared and shipped to Sri Lanka"
        },
        {
            number: 6,
            title: "Arrival to Sri Lanka",
            description: "Vehicle arrives at the port in Sri Lanka"
        },
        {
            number: 7,
            title: "Customs Clearance",
            description: "Complete customs clearance process and documentation"
        },
        {
            number: 8,
            title: "Vehicle Collection",
            description: "Collect your vehicle at Hambantota Port - ready to drive!"
        }
    ];

    useEffect(() => {
        // Intersection Observer for scroll-based animations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.2, // Trigger when 20% of the card is visible
                rootMargin: '0px 0px -100px 0px' // Start animation slightly before card enters viewport
            }
        );

        // Observe all step cards
        const cards = document.querySelectorAll('.step-card');
        cards.forEach((card) => {
            if (observerRef.current) {
                observerRef.current.observe(card);
            }
        });

        // Cleanup
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div className="import-process-page">
            {/* Hero Section */}
            <section className="process-hero">
                <div className="container">
                    <h1 className="page-title">Vehicle Import Process</h1>
                    <p className="page-subtitle">
                        Your journey from selection to delivery - simplified in 8 easy steps
                    </p>
                </div>
            </section>

            {/* Steps Grid */}
            <section className="process-steps">
                <div className="container">
                    <div className="steps-grid">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="step-card"
                            >
                                <div className="step-number-badge">
                                    <span className="step-number">{step.number}</span>
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-description">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="process-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2 className="cta-title">Ready to Start Your Journey?</h2>
                        <p className="cta-description">
                            Contact us today to begin the import process for your dream vehicle
                        </p>
                        <a href="/contact" className="cta-button">
                            Get Started
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ImportProcess;
