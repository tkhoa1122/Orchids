import React, { useState } from "react";
import "./FilterSideBar.css";
import { ListOfOrchid } from "../data/ListOfOrchid";

const FilterSidebar = ({ selectedCategories, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="filter-container">
        <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
          <span>Category Filter</span>
          <span className="dropdown-icon">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="filter-content">
            <p className="filter-title">Filter By Category</p>
            {[...new Set(ListOfOrchid.map(o => o.category))].map(cat => (
              <div key={cat} className="filter-item">
                <input
                  type="checkbox"
                  id={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                />
                <label htmlFor={cat}>{cat}</label>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="btn btn-primary mt-3"
        style={{ marginLeft: '1rem' }}
        onClick={() => alert('Create Orchid functionality')}
      >
        Create Orchid
      </button>
    </div>
  );
};

export default FilterSidebar;