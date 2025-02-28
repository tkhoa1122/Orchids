import React, { Component } from "react";
import './nav.css'

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false
    };
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }), () => {
      document.body.classList.toggle('dark-mode', this.state.darkMode);
      document.documentElement.classList.toggle('dark-mode', this.state.darkMode);
    });
  };

  render() {
    return (
      <nav className={`navbar navbar-expand-lg ${this.state.darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
        <div className="container-fluid">
          <div className="logo-div">
            <img
              className="logo"
              src="assets/img/logo.png"
              alt="Orchid Logo"
            />
            <a
              className={`navbar-brand ${this.state.darkMode ? 'text-light' : ''}`}
              href="#"
            >
              Orchids
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link active ${this.state.darkMode ? 'text-light' : ''}`} aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${this.state.darkMode ? 'text-light' : ''}`} href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex align-items-center me-3">
              <div className="form-check form-switch me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="darkModeSwitch"
                  checked={this.state.darkMode}
                  onChange={this.toggleDarkMode}
                />
                <label className={`form-check-label ${this.state.darkMode ? 'text-light' : ''}`} htmlFor="darkModeSwitch">
                  {this.state.darkMode ? '🌙' : '☀️'}
                </label>
              </div>
              <div className="dropdown">
                <button 
                  className="btn btn-link dropdown-toggle" 
                  type="button" 
                  id="userDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className={`fas fa-user ${this.state.darkMode ? 'text-light' : ''}`} style={{ fontSize: '1.5rem' }}></i>
                </button>
                <ul className={`dropdown-menu ${this.state.darkMode ? 'bg-dark' : ''}`} aria-labelledby="userDropdown">
                  <li>
                    <a className={`dropdown-item ${this.state.darkMode ? 'text-light' : ''}`} href="#">
                      <i className="fas fa-user-circle me-2"></i> Profile
                    </a>
                  </li>
                  <li>
                    <a className={`dropdown-item ${this.state.darkMode ? 'text-light' : ''}`} href="#">
                      <i className="fas fa-shopping-cart me-2"></i> Cart
                    </a>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <a className={`dropdown-item ${this.state.darkMode ? 'text-light' : ''}`} href="#">
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
