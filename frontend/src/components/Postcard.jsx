import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./PostCard.css";
import closeIcon from "../assets/closeIcon.svg";
import arrowIcon from "../assets/arrowIcon.svg";

export default function PostCard({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    title,
    description,
    location,
    city,
    address,
    price,
    furnished,
    smokingAllowed,
    gender,
    amenities,
    images,
    contact_Email,
    contact_Phone
  } = post;

  // Safe defaults
  const safeAmenities = amenities
  ? Object.entries(amenities)
      .filter(([key, value]) => value)
      .map(([key]) => key)
  : [];

  const safeImages = Array.isArray(images) ? images : [];

 const getImageSrc = (image) => {
  if (!image) return "/placeholder.png"; // fallback
  if (image instanceof File || image instanceof Blob) {
    return URL.createObjectURL(image); // only for newly uploaded files
  }
  // Assume backend returned filename
  return `http://localhost:5000/uploads/${image}`;
};

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? safeImages.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === safeImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="post-card">
      <div className="post-card-header">
        <h3>{title}</h3>
        <p className="post-price">{price} EGP</p>
      </div>

      <div className="post-card-body">
        <p className="post-description">{description}</p>

        <div className="post-details">
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span>{city || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Address:</span>
            <span>{address || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender:</span>
            <span>{gender === "male" ? "Male Only" : gender === "female" ? "Female Only" : "Any"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact Email:</span>
            <span>{contact_Email || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Contact Phone:</span>
            <span>{contact_Phone || "N/A"}</span>
          </div>
        </div>

        <div className="post-features">
          {furnished && <span className="feature-tag">Furnished</span>}
          {smokingAllowed && <span className="feature-tag">Smoking Allowed</span>}
          {!furnished && <span className="feature-tag-not">Unfurnished</span>}
          {!smokingAllowed && <span className="feature-tag-not">No Smoking</span>}
        </div>

        {safeAmenities.length > 0 && (
          <div className="post-amenities">
            <span className="amenities-label">Amenities:</span>
            <div className="amenities-list">
              {safeAmenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          </div>
        )}

        {safeImages.length > 0 && (
          <div className="post-images">
            <span className="images-label">Images:</span>
            <div className="images-preview">
              {safeImages.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={getImageSrc(image)}
                  alt={`Post image ${index + 1}`}
                  onClick={() => openModal(index)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
              {safeImages.length > 3 && (
                <span className="more-images">+{safeImages.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {isModalOpen && ReactDOM.createPortal(
          <div className="image-modal-overlay" onClick={closeModal}>
            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={closeModal}>
                <img src={closeIcon} alt="Close" />
              </button>
              <button className="nav-button prev-button" onClick={prevImage}>
                <img src={arrowIcon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
              </button>
              <img
                src={getImageSrc(safeImages[currentImageIndex])}
                alt={`Post image ${currentImageIndex + 1}`}
                className="modal-image"
              />
              <button className="nav-button next-button" onClick={nextImage}>
                <img src={arrowIcon} alt="Next" />
              </button>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}