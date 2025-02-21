import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./components/Navbar/nav.css";
import "./App.css";
import "./style.css";

import { ListOfOrchid } from "./components/data/ListOfOrchid";
import Orchids from "./components/OrchidData/Orchid";
import Nav from "./components/Navbar/nav";
import Footer from "./components/Footer/footer";
import FilterSidebar from "./components/FilterSideBar/FilterSideBar";

import User from "./components/UserPosts/User";

const App = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const filteredOrchids = selectedCategories.length === 0
    ? ListOfOrchid
    : ListOfOrchid.filter(orchid => selectedCategories.includes(orchid.category));

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }}>Orchids Store</h1>
      <div className="main-container">
        <FilterSidebar selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        <div>
          <Orchids orchids={filteredOrchids} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;