import React, { useState } from "react";
import "./OrchidModal.css"; // Thêm file CSS cho modal

const OrchidModal = ({ orchid, onClose }) => {
  if (!orchid) return null;

  const [likes, setLikes] = useState(orchid.likes);
  const [showAddToCart, setShowAddToCart] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {orchid.name}{" "}
          {orchid.isSpecial && (
            <span
              style={{
                color: "red",
                fontStyle: "italic",
                textTransform: "lowercase",
                fontSize: "0.8em",
              }}
            >
              (rare)
            </span>
          )}
        </h3>
        <img src={orchid.image} alt={orchid.name} className="orchid-image" />
        
        <p>
          <strong>Origin:</strong>
          <span style={{ color: "black", fontWeight: "bold" }}>
            {orchid.origin}
          </span>
        </p>

        <p>
          <strong>Color:</strong>{" "}
          <span style={{
            color: orchid.color.toLowerCase(),
            fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 1)"
          }}>
            {orchid.color}
          </span>
        </p>

        <p>
          <strong>Category:</strong> {orchid.category}
        </p>

        {/* Rating */}
        <p>
          <strong>Rating:</strong>
          <span className="d-flex">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`fas fa-star ${index < orchid.rating ? "text-warning" : "text-muted"}`}
                style={{ fontSize: "1.2rem", cursor: "pointer" }}
              />
            ))}
          </span>
        </p>

        {/* Video */}
        <div className="video-section">
          <iframe
            width="100%"
            height="250"
            src={orchid.video}
            title={orchid.name}
            allowFullScreen
          ></iframe>
        </div>

        {/* Like and Price */}
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={handleLike}
          >
            <i className="fas fa-thumbs-up" style={{ marginRight: "5px" }}></i>
            {likes}
          </button>

          <button
            className="btn btn-outline-success"
            onMouseEnter={() => setShowAddToCart(true)}
            onMouseLeave={() => setShowAddToCart(false)}
            onClick={() => alert("Added to cart!")}
          >
            {showAddToCart ? (
              <>
                <i className="fas fa-shopping-cart" style={{ marginRight: "5px" }}></i>
                Add to Cart
              </>
            ) : (
              orchid.marketValue
            )}
          </button>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrchidModal;
