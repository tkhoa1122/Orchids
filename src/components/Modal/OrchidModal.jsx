import React, { useState } from "react";
import "./OrchidModal.css"; // Thêm file CSS cho modal
import { Link } from "react-router-dom";
import api from "../data/Axios";

const OrchidModal = ({ orchid, onClose, onUpdateLikes }) => {
  if (!orchid) return null;

  const [likes, setLikes] = useState(orchid.likes);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // Xử lý like với API
  const handleLike = async () => {
    try {
      setIsLiking(true);
      // Gọi API để cập nhật số likes
      const response = await api.put(`/get-all-orchids/${orchid.id}`, {
        ...orchid,
        likes: likes + 1
      });
      
      // Cập nhật state local
      setLikes(response.data.likes);
      
      // Callback để cập nhật state ở component cha (nếu cần)
      if (onUpdateLikes) {
        onUpdateLikes(orchid.id, response.data.likes);
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      alert('Không thể cập nhật likes. Vui lòng thử lại sau!');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>
          {orchid.name}{" "}
          {orchid.isSpecial && (
            <span className="special-tag">
              (rare)
            </span>
          )}
        </h3>

        {/* Hình ảnh với error handling */}
        <img 
          src={orchid.image} 
          alt={orchid.name} 
          className="orchid-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/img/default-orchid.jpg';
          }}
        />

        <p>
          <strong>Origin: </strong>
          <span className="origin-text">
            {orchid.origin}
          </span>
        </p>

        <p>
          <strong>Color:</strong>{" "}
          <span className="color-text" style={{
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
        <div className="rating-container">
          <strong>Rating:</strong>
          <span className="rating-stars">
            {Array.from({ length: 5 }, (_, index) => (
              <i
                key={index}
                className={`fas fa-star ${index < orchid.rating ? "text-warning" : "text-muted"}`}
                style={{ fontSize: "1.2rem" }}
              />
            ))}
          </span>
        </div>

        {/* Video với error handling */}
        {orchid.video && (
          <div className="video-section">
            <iframe
              width="100%"
              height="250"
              src={orchid.video}
              title={orchid.name}
              allowFullScreen
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            ></iframe>
          </div>
        )}

        {/* Like và Actions */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className={`btn btn-outline-primary d-flex align-items-center ${isLiking ? 'disabled' : ''}`}
            onClick={handleLike}
            disabled={isLiking}
          >
            <i className="fas fa-thumbs-up me-2"></i>
            {isLiking ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {likes}
          </button>

          <Link
            to={`/orchid/${orchid.id}`}
            className="btn btn-primary"
          >
            Chi tiết
          </Link>

          <button
            className="btn btn-outline-success"
            onMouseEnter={() => setShowAddToCart(true)}
            onMouseLeave={() => setShowAddToCart(false)}
            onClick={() => alert("Đã thêm vào giỏ hàng!")}
          >
            {showAddToCart ? (
              <>
                <i className="fas fa-shopping-cart me-2"></i>
                Thêm vào giỏ
              </>
            ) : (
              orchid.marketValue
            )}
          </button>
        </div>

        <button className="close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default OrchidModal;
