import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import welcomeImage from '../images/welcome.png';
import { FaCheckCircle, FaMobileAlt, FaCloud } from 'react-icons/fa';

// Navbar component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#ADD8E6' , padding: '20px 0',fontSize: '18px' }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ color: '#fff',fontSize:'24px' }}>TodoList</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/register" className="nav-link me-4 ms-5" style={{ color: '#fff', fontSize:'20px' }}>Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ color: '#fff' , fontSize:'20px'}}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="welcome-image-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image img-fluid" />
      </div>
      <div className="welcome-message">
        <h1 className="welcome-header display-4" style={{ color: '#333' }}>Welcome to TodoList</h1>
        <p className="lead" style={{ color: '#666' }}>Your go-to place for managing your tasks.</p>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="feature-item col-md-4 mb-2">
      {icon}
      <h3 style={{ color: '#333' }}>{title}</h3>
      <p style={{ color: '#666' }}>{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="features-section py-5">
      <h2 className="text-center" style={{ color: '#333' }}>Key Features</h2>
      <div className="feature-items row justify-content-center mt-5">
        <FeatureItem
          icon={<FaCheckCircle size={30} />}
          title="Easy Task Management"
          description="Create, edit, and complete tasks with ease."
        />
        <FeatureItem
          icon={<FaMobileAlt size={30} />}
          title="Mobile Friendly"
          description="Access your tasks on any device."
        />
        <FeatureItem
          icon={<FaCloud size={30} />}
          title="Cloud Sync"
          description="Your tasks are always up-to-date across all your devices."
        />
      </div>
    </div>
  );
};

// Footer 
const Footer = () => {
  return (
    <footer className="footer py-5" style={{ backgroundColor: '#ADD8E6', color: '#fff' }}>
      <div className="container">
        <p className="text-center">&copy; 2023 TodoList. All rights reserved.</p>
      </div>
    </footer>
  );
};


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Home;