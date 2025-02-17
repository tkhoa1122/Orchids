import React, { useState } from "react";

const OrchidCard = ({ orchid }) => {
  //Init number of likes
  const [likes, setLikes] = useState(orchid.likes);
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [rating, setRating] = useState(orchid.rating || 0);


  //func to handle like button
  const handleLike = () => {
    setLikes(likes + 1);
  };

  //handle rating star
  const handleStarClick = (index) => {
    setRating(index + 1);
  }

  return (
    <div className="orchid-card">
      <img src={orchid.image} alt={orchid.name} />

      <h3>
        {orchid.name}{" "}
        {orchid.isSpecial && (
          <span
            style={{
              color: "red",
              fontStyle: "italic",
              textTransform: "lowercase",
              fontSize: "0.8em", // Giảm kích thước chữ
            }}
          >
            (rare)
          </span>
        )}
      </h3>

      <p>
        <strong>Origin:</strong>
        <span
          style={{
            color: "black",
            fontWeight: "bold", // Đậm chữ
          }}
        >
          {orchid.origin}
        </span>
      </p>

      <p>
        <strong>Color:</strong>{" "}
        <span
          style={{
            color: orchid.color.toLowerCase(),
            fontWeight: "bold", // Đậm chữ
            textShadow: "1px 1px 2px rgba(0, 0, 0, 1)", // Hiệu ứng nổi nhẹ
          }}
        >
          {orchid.color}
        </span>
      </p>

      <p>
        <strong>Category:</strong> {orchid.category}
      </p>

      {/* Rating với Bootstrap và FontAwesome */}
      <p>
        <strong>Rating:</strong>

        <span className="d-flex">

          {Array.from({ length: 5 }, (_, index) => (
            <i
              key={index}
              className={`fas fa-star ${index < rating ? "text-warning" : "text-muted"}`}
              style={{ fontSize: "1.2rem", cursor: "pointer" }} // cursor to feel like can click
              onClick={() => handleStarClick(index)}
            />
          ))}

        </span>

      </p>

      <p>
        <strong>Video:</strong>
        <button
          className="btn btn-outline-info"
          onClick={() => window.open(orchid.video, "_blank")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i className="fas fa-play-circle" style={{ marginRight: "8px" }}></i>
          Watch Video
        </button>
      </p>

      {/* Thêm 2 nút cho Price và Add to Cart */}
      <div className="d-flex justify-content-between align-items-center">
        {/* Nút Like */}
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
              <i
                className="fas fa-shopping-cart"
                style={{ marginRight: "5px" }}
              ></i>
              Add to Cart
            </>
          ) : (
            orchid.marketValue
          )}
        </button>
      </div>
    </div>
  );
};

export default OrchidCard;
