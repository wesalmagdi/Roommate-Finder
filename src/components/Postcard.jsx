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
            <span>{location}, {city}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Address:</span>
            <span>{address}</span>
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

        {amenities.length > 0 && (
          <div className="post-amenities">
            <span className="amenities-label">Amenities:</span>
            <div className="amenities-list">
              {amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">{amenity}</span>
              ))}
            </div>
          </div>
        )}

        {images && images.length > 0 && (
          <div className="post-images">
            <span className="images-label">Images:</span>
            <div className="images-preview">
              {images.slice(0, 3).map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Post image ${index + 1}`} />
              ))}
              {images.length > 3 && (
                <span className="more-images">+{images.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
