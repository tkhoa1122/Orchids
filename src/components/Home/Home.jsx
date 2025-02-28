import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../components/Navbar/nav";
import "./style.css";
import "./Home.css";

import { ListOfOrchid } from "../../components/data/ListOfOrchid";
import Orchids from "../../components/OrchidData/Orchid";
import Nav from "../../components/Navbar/nav";
import Footer from "../../components/Footer/footer";
import FilterSidebar from "../../components/FilterSideBar/FilterSideBar";
import OrchidModal from "../../components/Modal/OrchidModal";

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category) ? prevSelected.filter((c) => c !== category) : [...prevSelected, category]
    );
  };

  const filteredOrchids = selectedCategories.length === 0
    ? ListOfOrchid
    : ListOfOrchid.filter(orchid => selectedCategories.includes(orchid.category));

  const handleOrchidClick = (orchid) => {
    setSelectedOrchid(orchid);
  };

  const handleCloseModal = () => {
    setSelectedOrchid(null);
  };

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }}>Orchids Store</h1>
      <div className="main-container">
        <FilterSidebar selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        <div className="orchids-container">
          <Orchids orchids={filteredOrchids} onOrchidClick={handleOrchidClick} />
        </div>
      </div>
      <OrchidModal orchid={selectedOrchid} onClose={handleCloseModal} />
      <Footer />
    </div>
  );
};

export default Home;