import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import OrchidDetail from './components/OrchidData/OrchidDetail'; // Nếu sau này có chi tiết

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/orchid/:id" element={<OrchidDetail />} />
                <Route path="/contact" element={<div>Contact Page</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
