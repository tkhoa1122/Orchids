import React, { useState, useEffect } from 'react';
import Nav from '../Navbar/nav';
import Footer from '../Footer/footer';
import { useParams } from 'react-router-dom';
import "./OrchidDetail.css"
import api from '../data/Axios';

const OrchidDetail = () => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu orchid từ API
  useEffect(() => {
    const fetchOrchidDetail = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/get-all-orchids/${id}`);
        setOrchid(response.data);
        setError(null);
      } catch (err) {
        setError('Không thể tải thông tin hoa lan. Vui lòng thử lại sau!');
        console.error('Error fetching orchid details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchidDetail();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Not found state
  if (!orchid) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy thông tin hoa lan
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="container my-5">
        <div className="row">
          {/* Hình ảnh bên trái */}
          <div className="col-md-6">
            <img 
              src={orchid.image} 
              alt={orchid.name} 
              className="img-fluid rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/img/default-orchid.jpg';
              }}
            />
          </div>

          {/* Thông tin bên phải */}
          <div className="col-md-6">
            <h3 className="mb-4 orchid-title">
              {orchid.name}
              {orchid.isSpecial && (
                <span className="special-badge">
                  (rare)
                </span>
              )}
            </h3>

            <div className="orchid-info">
              <p className="info-item">
                <strong>Xuất xứ: </strong>
                <span className="origin-text">
                  {orchid.origin}
                </span>
              </p>
              <p className="info-item">
                <strong>Màu sắc:</strong> 
                <span className="color-text" style={{ color: orchid.color.toLowerCase() }}>
                  {' ' + orchid.color}
                </span>
              </p>
              <p className="info-item">
                <strong>Loại:</strong> {orchid.category}
              </p>
              <p className="info-item">
                <strong>Giá trị:</strong> 
                <span className="price-text">
                  {orchid.marketValue}
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="rating-section">
              <strong>Đánh giá:</strong>
              <div className="stars-container">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${index < orchid.rating ? "text-warning" : "text-muted"}`}
                    style={{ fontSize: "1.5rem" }}
                  />
                ))}
              </div>
            </div>

            {/* Likes */}
            <div className="likes-section mb-4">
              <strong>Lượt thích:</strong>
              <span className="ms-2">
                <i className="fas fa-heart text-danger"></i>
                <span className="ms-1">{orchid.likes}</span>
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn btn-success w-100 mb-4 add-to-cart-btn"
              onClick={() => alert('Đã thêm vào giỏ hàng!')}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Video Section */}
        {orchid.video && (
          <div className="row mt-5">
            <div className="col-12">
              <h4 className="mb-3">Video giới thiệu</h4>
              <div className="video-container">
                <iframe
                  src={orchid.video}
                  title={orchid.name}
                  allowFullScreen
                  className="rounded shadow"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrchidDetail;
