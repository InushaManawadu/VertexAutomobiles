import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/BG Removed.png';

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <img src={logo} alt="Vertex Automobiles" className="hero-logo" />
                        <h1 className="hero-title">Vertex Automobiles</h1>
                        <p className="hero-subtitle">
                            Discover quality pre-owned vehicles at the best prices in Sri Lanka
                        </p>
                        <div className="hero-motto">
                            <span className="motto-accent"></span>
                            <p className="motto-text">Drive Your Ambition</p>
                            <span className="motto-accent"></span>
                        </div>
                        <Link to="/stock" className="btn-primary hero-btn">
                            View Our Stock
                        </Link>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

