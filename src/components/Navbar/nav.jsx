import React, { useState } from "react";
import './nav.css';
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    document.documentElement.classList.toggle('dark-mode', newMode);
  };

  const getProfilePath = () => "/profile"; // Giả lập đường dẫn hồ sơ
  const handleLogout = () => alert("Đăng xuất thành công!"); // Giả lập đăng xuất

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
      <div className="container-fluid">
        <div className="logo-div">
          <img className="logo" src="assets/img/logo.png" alt="Orchid Logo" />
          <a className={`navbar-brand ${darkMode ? 'text-light' : ''}`} href="#">
            Orchids
          </a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link active ${darkMode ? 'text-light' : ''}`} aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${darkMode ? 'text-light' : ''}`} href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>

          {/* Dark Mode Switch + User Menu */}
          <div className="d-flex align-items-center me-3">
            {/* Dark Mode Toggle */}
            <div className="form-check form-switch me-3">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
              <label className={`form-check-label ${darkMode ? 'text-light' : ''}`} htmlFor="darkModeSwitch">
                {darkMode ? '🌙' : '☀️'}
              </label>
            </div>

            {/* User Dropdown */}
            <div className="position-relative">
              <button
                onClick={() => setIsShowMenu(!isShowMenu)}
                className="btn btn-link d-flex align-items-center text-gray-700 hover:text-blue-500 transition-colors"
                style={{ fontSize: '1.5rem' }}
              >
                <FaUserCircle />
              </button>

              {isShowMenu && (
                <div
                  className={`position-absolute mt-2 end-0 rounded shadow ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
                  style={{ width: '200px', zIndex: 1050 }}
                >
                  <Link
                    to={getProfilePath()}
                    className="dropdown-item px-3 py-2"
                    onClick={() => setIsShowMenu(false)}
                    style={{ cursor: 'pointer' }}
                  >
                    Hồ Sơ
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      setIsShowMenu(false);
                      handleLogout();
                    }}
                    className="dropdown-item px-3 py-2 text-start"
                    style={{ cursor: 'pointer', width: '100%' }}
                  >
                    Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
