import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./App.css";
import "./style.css";
import Orchids from "./components/OrchidData/Orchid";
import Nav from "./components/Navbar/nav";
import Footer from "./components/Footer/footer";

import User from "./components/UserPosts/User";

function App() {
  // Khai báo đúng state userId
  const [userId, setUserId] = useState();

  return (
    <>
      <div>
        {/* Navbar */}
        <Nav />

        <h1 style={{ textAlign: 'center' }}>Orchids Store</h1>

        <Orchids />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
