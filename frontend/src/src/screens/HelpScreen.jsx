import React, { useState } from 'react';
import './HelpScreen.css';

const HelpScreen = () => {
const teamMembers = [
  { 
    name: "Rama Mousa", 
    role: "Frontend Developer", 
    email: "R.mohamed2373@nu.edu.eg",
    linkedin: "https://www.linkedin.com/in/rama-mohamed-a51800305" 
  },
  { 
    name: "Wesal Magdi", 
    role: "Backend Developer", 
    email: "w.magdy2386@nu.edu.eg",
    linkedin: "https://www.linkedin.com/in/wesalmagdy"
  },
  { 
    name: "Rana Osman", 
    role: "Testing", 
    email: "R.mohsen2397@nu.edu.eg",
    linkedin: "https://www.linkedin.com/in/rana-osman-0241a4351"
  },
  { 
    name: "Raneem Khaled", 
    role: "Database Engineer", 
    email: "R.Khaled2324@nu.edu.eg",
    linkedin: "https://www.linkedin.com/in/raneem-khaled-67089631b"
  }
];


  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Message Sent:", formData);
    alert("Thank you! Our team will get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="help-page">
      
      
      <section className="help-section hero-strip">
        <div className="help-container">
          <h1>Help & Support</h1>
          <p>Everything you need to know about our platform and the team behind it.</p>
        </div>
      </section>

      
      <section className="help-section team-strip">
        <div className="help-container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-card__avatar">{member.name.charAt(0)}</div>
                <span className="team-card__role">{member.role}</span>
                <h3>{member.name}</h3>
                
                <p> {member.email}</p>
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bio-link"
                >
                  LinkedIn Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="help-section contact-strip">
        <div className="help-container contact-flex">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>Have a question or feedback? We'd love to hear from you.</p>
            <div className="contact-details">
              <p>📍 <strong>Location:</strong> Giza, Egypt</p>
              <p>📧 <strong>Email:</strong> support@roomiefinder.com</p>
            </div>
          </div>

       
        </div>
      </section>
    </div>
  );
};

export default HelpScreen;