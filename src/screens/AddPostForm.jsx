// screens/AddPostForm.jsx
import React, { useState } from "react";
import "./AddPostForm.css";

export default function AddPostForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    address: "",
    price: "",
    furnished: false,
    notFurnished: false,
    smokingAllowed: false,
    noSmoking: false,
    gender: "",
    amenities: [],
    contact_Email: "",
    contact_Phone: "",
    images: []
  });

  const [errors, setErrors] = useState({});

  const governorates = [
    "Cairo", "Alexandria", "Port Said", "Suez", "Damietta", "Dakahlia", "Sharkia",
    "Qalyubia", "Kafr El Sheikh", "Gharbia", "Monufia", "Beheira", "Ismailia", "Giza",
    "Beni Suef", "Fayoum", "Minya", "Asyut", "Sohag", "Qena", "Luxor", "Aswan",
    "Red Sea", "New Valley", "Matrouh", "North Sinai", "South Sinai"
  ];

  const amenitiesList = [
    "WiFi", "Parking", "Gym", "Pool", "Laundry",
    "Air Conditioning", "Heating", "Kitchen", "Balcony", "Pet Friendly"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Mutually exclusive checkbox logic
  const handleCheckboxChange = (name, checked) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: checked };
      if (name === "furnished" && checked) updated.notFurnished = false;
      if (name === "notFurnished" && checked) updated.furnished = false;
      if (name === "smokingAllowed" && checked) updated.noSmoking = false;
      if (name === "noSmoking" && checked) updated.smokingAllowed = false;
      return updated;
    });
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    if (errors.images) setErrors(prev => ({ ...prev, images: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.gender) newErrors.gender = "Gender preference is required";
    if (formData.images.length === 0) newErrors.images = "At least one image is required";
    if (!formData.contact_Email.trim()) newErrors.contact_Email = "Contact email is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="addpost-overlay">
      <div className="addpost-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Spacious 2BR Apartment"
              className={errors.title ? "error" : ""}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your property in detail..."
              className={errors.description ? "error" : ""}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Location + City */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="District / Area"
                className={errors.location ? "error" : ""}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>



            <div className="form-group">
              <label htmlFor="city">City *</label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={errors.city ? "error" : ""}
              >
                <option value="">Select Governorate</option>
                {governorates.map(gov => <option key={gov} value={gov}>{gov}</option>)}
              </select>
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
          </div>

          

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street, Building, Floor"
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price (EGP) *</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              className={errors.price ? "error" : ""}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Preferred Gender *</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={errors.gender ? "error" : ""}
            >
              <option value="">Select…</option>
              <option value="male">Male Only</option>
              <option value="female">Female Only</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          {/* Property Features 2x2 Grid */}
          <div className="form-group property-features">
            <label>Property Features</label>
            <div className="checkbox-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="furnished"
                  checked={formData.furnished}
                  onChange={(e) => handleCheckboxChange("furnished", e.target.checked)}
                />
                <label htmlFor="furnished" className="checkbox-label">Furnished</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="notFurnished"
                  checked={formData.notFurnished}
                  onChange={(e) => handleCheckboxChange("notFurnished", e.target.checked)}
                />
                <label htmlFor="notFurnished" className="checkbox-label">Not Furnished</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="smokingAllowed"
                  checked={formData.smokingAllowed}
                  onChange={(e) => handleCheckboxChange("smokingAllowed", e.target.checked)}
                />
                <label htmlFor="smokingAllowed" className="checkbox-label">Smoking Allowed</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="noSmoking"
                  checked={formData.noSmoking}
                  onChange={(e) => handleCheckboxChange("noSmoking", e.target.checked)}
                />
                <label htmlFor="noSmoking" className="checkbox-label">No Smoking</label>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="form-group amenities">
            <label>Amenities</label>
            <div className="checkbox-row">
              {amenitiesList.map(amenity => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Contact Info */}{/* Address */}
          <div className="form-group">
            <label htmlFor="contact_Email">Contact Email *</label>
            <input
              id="contact_Email"
              name="contact_Email"
              value={formData.contact_Email}
              onChange={handleInputChange}
              placeholder="Contact Email"
              className={errors.contact_Email ? "error" : ""}
            />
            {errors.contact_Email && <span className="error-message">{errors.contact_Email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="contact_Phone">Contact Phone </label>
            <input
              id="contact_Phone"
              name="contact_Phone"
              value={formData.contact_Phone}
              onChange={handleInputChange}
              placeholder="Contact Phone (optional)"
              className={errors.contact_Phone ? "error" : ""}
            />
            {errors.contact_Phone && <span className="error-message">{errors.contact_Phone}</span>}
          </div>


          {/* Images */}
          <div className="form-group">
            <label>Images *</label>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            {errors.images && <span className="error-message">{errors.images}</span>}
          </div>

          {/* Submit */}
          <div className="buttons">
            <button type="submit" className="confirm-btn">Submit Post</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Close</button>
          </div>

        </form>
      </div>
    </div>
  );
}
