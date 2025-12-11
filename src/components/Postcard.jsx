import React from "react";
import "./PostCard.css";

export default function PostCard({ post }) {
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
    images
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
        </div>

        <div className="post-features">
          {furnished && <span className="feature-tag">Furnished</span>}
          {smokingAllowed && <span className="feature-tag">Smoking Allowed</span>}
          {!furnished && <span className="feature-tag">Unfurnished</span>}
          {!smokingAllowed && <span className="feature-tag">No Smoking</span>}
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
                <img key={index} src={getImageSrc(image)} alt={`Post image ${index + 1}`} />
              ))}
              {safeImages.length > 3 && (
                <span className="more-images">+{safeImages.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
