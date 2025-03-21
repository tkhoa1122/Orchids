import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./style.css";
import "./Home.css";

import api from "../../components/data/Axios";
import Orchids from "../../components/OrchidData/Orchid";
import Nav from "../../components/Navbar/nav";
import Footer from "../../components/Footer/footer";
import FilterSidebar from "../../components/FilterSideBar/FilterSideBar";
import OrchidModal from "../../components/Modal/OrchidModal";

const Home = () => {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  // Fetch dữ liệu từ API khi component được mount
  useEffect(() => {
    fetchOrchids();
  }, []);

  // Hàm fetch dữ liệu orchids
  const fetchOrchids = async () => {
    try {
      setLoading(true);
      const response = await api.get('/get-all-orchids');
      setOrchids(response.data);
      setError(null);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
      console.error('Error fetching orchids:', err);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi category filter
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  // Lọc orchids theo category đã chọn
  const filteredOrchids = selectedCategories.length === 0
    ? orchids
    : orchids.filter(orchid => selectedCategories.includes(orchid.category));

  // Xử lý khi click vào một orchid
  const handleOrchidClick = (orchid) => {
    setSelectedOrchid(orchid);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setSelectedOrchid(null);
  };

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  // Hiển thị error state
  if (error) {
    return (
      <div className="error-container alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }}>Orchids Store</h1>
      <div className="main-container">
        <FilterSidebar 
          selectedCategories={selectedCategories} 
          onCategoryChange={handleCategoryChange}
          // Truyền danh sách categories duy nhất từ dữ liệu API
          categories={[...new Set(orchids.map(orchid => orchid.category))]}
        />
        <div className="orchids-container">
          <Orchids 
            orchids={filteredOrchids} 
            onOrchidClick={handleOrchidClick}
          />
        </div>
      </div>
      <OrchidModal 
        orchid={selectedOrchid} 
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
};

export default Home;