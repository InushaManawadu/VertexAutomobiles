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
                        <div className="flex justify-center gap-md" style={{ flexWrap: 'wrap' }}>
                            <a href="tel:+94767262633" className="btn btn-primary">
                                📞 Call Us
                            </a>
                            <a
                                href={`https://wa.me/94767262633?text=Hi, I'm interested in the vehicle import process`}
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
            </section>
        </div>
    );
};

export default ImportProcess;
