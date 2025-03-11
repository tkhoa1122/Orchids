import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import OrchidDetail from './components/OrchidData/OrchidDetail'; // Nếu sau này có chi tiết
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import { Profile } from './components/Profile/Profile';
import { OrchidManagement } from './components/Profile/OrchidManagement';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/orchid/:id" element={<OrchidDetail />} />
                <Route path="/Contact" element= {<Contact/>} />
                <Route path="/About" element= {<About/>} />

                <Route path="/Profile" element= {<Profile/>} />
                <Route path="/OrchidManagement" element= {<OrchidManagement/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
