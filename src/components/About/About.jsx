import React from 'react';
import Nav from '../Navbar/nav'
import './about.css';

export default function About() {
  return (
    <>
      {/* Header */}
      <Nav />
      {/* Main content for About Us page */}
      <div className="container" style={{ padding: '40px 0' }}>
        <h1>About Us</h1>

        {/* Image of orchids */}
        <div className='about' style={{ textAlign: 'center', margin: '20px 0' }}>
          <img
            src="http://localhost:5173/assets/img/about.jpg" // Update this path to your actual image
            alt="About Orchid"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
          />
        </div>

        <p>
          Welcome to our Orchid website! We are passionate about growing and selling beautiful orchids.
          Our mission is to bring the most stunning and diverse orchids to our customers, from rare varieties
          to everyday favorites. We pride ourselves on offering top-quality flowers that will brighten any space.
        </p>
        <p>
          At our company, we believe in sustainable and eco-friendly practices to ensure that our orchids thrive
          in a way that’s respectful to the environment. Whether you're a seasoned collector or a beginner,
          we are here to guide you in choosing the perfect orchid.
        </p>
        <p>
          Thank you for supporting our passion for orchids, and we hope to bring a piece of nature’s beauty into your home.
        </p>

        {/* Map */}
        <div className="map" style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2>Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65206.810167555464!2d106.79054044863278!3d10.940299299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174df56cba8ae0f%3A0xfaaa38a1c2856ab0!2zU2hvcCBIb2EgVMawxqFpIE5o4bqtdA!5e1!3m2!1sen!2s!4v1728107538368!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer */}
    </>
  );
}
