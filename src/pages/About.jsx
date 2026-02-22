import './About.css';

const About = () => {
    return (
        <div className="about">
            <div className="container">
                {/* Hero Section */}
                <section className="about-hero">
                    <h1 className="page-title">About Vertex Automobiles</h1>
                    <p className="page-subtitle">
                        Your trusted partner for quality pre-owned vehicles in Sri Lanka
                    </p>
                </section>

                {/* Story Section */}
                <section className="story-section">
                    <div className="story-content">
                        <h2>Our Story</h2>
                        <p>
                            Founded with a passion for automobiles and a commitment to customer satisfaction,
                            Vertex Automobiles has become one of Sri Lanka's most trusted names in the pre-owned vehicle market.
                            We understand that buying a car is a significant investment, and we're here to make that
                            journey as smooth and transparent as possible.
                        </p>
                        <p>
                            With years of experience in the automotive industry, our team carefully selects and
                            inspects every vehicle in our inventory. We believe in building long-term relationships
                            with our customers through honesty, transparency, and exceptional service.
                        </p>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="why-section">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Quality Assured</h3>
                            <p>
                                Every vehicle undergoes rigorous inspection to ensure it meets our high standards
                                of quality and safety.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Transparent Pricing</h3>
                            <p>
                                No hidden fees or surprises. We believe in honest, upfront pricing so you can
                                make informed decisions.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Customer First</h3>
                            <p>
                                Your satisfaction is our priority. We're committed to providing exceptional
                                service before, during, and after your purchase.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Complete Documentation</h3>
                            <p>
                                We handle all paperwork and ensure smooth transfer of ownership, making the
                                process hassle-free for you.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>After-Sales Support</h3>
                            <p>
                                Our relationship doesn't end at the sale. We provide ongoing support and
                                maintenance advice for your vehicle.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Wide Selection</h3>
                            <p>
                                From compact city cars to spacious SUVs, we offer a diverse range of vehicles
                                to suit every need and budget.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="mission-section">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <h2>Our Mission</h2>
                            <p>
                                To provide Sri Lankan car buyers with access to quality pre-owned vehicles
                                at fair prices, backed by transparent processes and exceptional customer service.
                                We strive to make car ownership accessible and enjoyable for everyone.
                            </p>
                        </div>

                        <div className="mission-card">
                            <h2>Our Vision</h2>
                            <p>
                                To become Sri Lanka's most trusted and preferred destination for pre-owned
                                vehicles, setting industry standards for quality, transparency, and customer
                                satisfaction. We envision a future where every customer drives away happy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="values-section">
                    <h2 className="section-title">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <h3>Integrity</h3>
                            <p>We conduct business with honesty and transparency in every transaction.</p>
                        </div>
                        <div className="value-item">
                            <h3>Excellence</h3>
                            <p>We are committed to providing the highest quality vehicles and service.</p>
                        </div>
                        <div className="value-item">
                            <h3>Trust</h3>
                            <p>We build lasting relationships based on reliability and credibility.</p>
                        </div>
                        <div className="value-item">
                            <h3>Innovation</h3>
                            <p>We continuously improve our processes to serve you better.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="about-cta">
                    <h2>Ready to Find Your Perfect Car?</h2>
                    <p>Browse our collection of quality pre-owned vehicles today</p>
                    <a href="/stock" className="btn-primary">
                        View Our Stock
                    </a>
                </section>
            </div>
        </div>
    );
};

export default About;
