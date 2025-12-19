"use client"

import './AboutUs.css';
import { Link } from 'react-router-dom';
import { Users, Home, Shield, Search } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="about-container">
     
      <section className="hero-section hero-strip">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Roommate</h1>
          <p className="hero-subtitle">
            Connecting people to create the best shared living experiences
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="content-wrapper">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            We believe that finding the right roommate shouldn't be stressful or complicated. 
            Our mission is to make the roommate search process simple, safe, and enjoyable by 
            connecting compatible individuals who are looking for their ideal living situation.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="content-wrapper">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <Users size={32} />
              </div>
              <h3 className="step-title">Create Your Profile</h3>
              <p className="step-description">
                Tell us about yourself, your lifestyle, and what you're looking for in a roommate.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">
                <Search size={32} />
              </div>
              <h3 className="step-title">Browse & Match</h3>
              <p className="step-description">
                Search through profiles and find roommates who match your preferences and lifestyle.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">
                <Home size={32} />
              </div>
              <h3 className="step-title">Connect & Move In</h3>
              <p className="step-description">
                Message potential roommates, meet up, and find your perfect living arrangement.
              </p>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="content-wrapper">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3 className="value-title">Trust</h3>
              <p className="value-description">
                We prioritize safety and authenticity with verified profiles. 
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Compatibility</h3>
              <p className="value-description">
                Our smart matching system helps you find roommates who share your lifestyle and values.
              </p>
            </div>
            
            <div className="value-card">
              <h3 className="value-title">Community</h3>
              <p className="value-description">
                We're building a supportive community where everyone can find their ideal living situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section cta-strip">
        <div className="content-wrapper">
          <h2 className="cta-title">Ready to Find Your Roommate?</h2>
          <p className="cta-text">
            Join thousands of people who have found their perfect living arrangement.
          </p>
          <Link to="/register" className="cta-button">Get Started Today</Link>
          
          
        </div>
      </section>
    </div>
  );
}
