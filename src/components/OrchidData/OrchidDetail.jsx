import React from 'react';
import Nav from '../Navbar/nav';
import Footer from '../Footer/footer';
import { useParams } from 'react-router-dom';
import { ListOfOrchid } from '../data/ListOfOrchid';

const OrchidDetail = () => {
  const { id } = useParams();
  const orchid = ListOfOrchid.find(o => o.id === id);

  if (!orchid) {
    return <div>Orchid not found</div>;
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
              className="img-fluid rounded"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </div>

          {/* Thông tin bên phải */}
          <div className="col-md-6">
            <h3 className="mb-4" style={{ 
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              {orchid.name}
              {orchid.isSpecial && (
                <span style={{
                  color: "red",
                  fontStyle: "italic",
                  textTransform: "lowercase",
                  fontSize: "0.8em",
                  marginLeft: "8px"
                }}>
                  (rare)
                </span>
              )}
            </h3>

            <div className="mb-4" style={{ fontSize: '1rem' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ fontWeight: '600' }}>Origin: </strong>
                <span style={{ 
                  color: "black",
                  fontWeight: "bold"
                }}>
                  {orchid.origin}
                </span>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ fontWeight: '600' }}>Color:</strong> 
                <span style={{ 
                  color: orchid.color.toLowerCase(),
                  fontWeight: "bold",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)"
                }}>
                  {' ' + orchid.color}
                </span>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ fontWeight: '600' }}>Category:</strong> {orchid.category}
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong style={{ fontWeight: '600' }}>Market Value:</strong> 
                <span style={{ 
                  color: "blue",
                  fontWeight: "bold"
                }}>
                  {orchid.marketValue}
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="mb-4 d-flex align-items-center">
              <strong style={{ marginRight: '10px' }}>Rating:</strong>
              <div>
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${index < orchid.rating ? "text-warning" : "text-muted"}`}
                    style={{ fontSize: "1.5rem" }}
                  />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="btn btn-success w-100 mb-4"
              onClick={() => alert('Added to cart!')}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Add to Cart
            </button>
          </div>
        </div>

        {/* Video ở dưới */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="ratio ratio-16x9">
              <iframe
                src={orchid.video}
                title={orchid.name}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrchidDetail;
