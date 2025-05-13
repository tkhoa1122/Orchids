import React, { useState } from "react";

const OrchidCard = ({ orchid }) => {
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
    </div>
  );
};

export default OrchidCard;
