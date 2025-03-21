import React, { useState, useEffect } from "react";
import './nav.css';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../public/assets/img/logo.png';
import { auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '../Firebase/config';

const Nav = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Xử lý hiển thị thông báo
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode);
    document.documentElement.classList.toggle('dark-mode', newMode);
  };

  // Xử lý đăng nhập Google
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      setNotification({ message: 'Đăng nhập thành công!', type: 'success' });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      setNotification({ message: 'Đăng nhập thất bại. Vui lòng thử lại!', type: 'error' });
    }
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('token');
      setNotification({ message: 'Đăng xuất thành công!', type: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      setNotification({ message: 'Đăng xuất thất bại. Vui lòng thử lại!', type: 'error' });
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
        <div className="container-fluid">
          <div className="logo-div">
            <img className="logo" src={logo} alt="Orchid Logo" />
            <Link 
                  className={`navbar-brand ${darkMode ? 'text-light' : ''}`} 
                  to="/"
                >
                  Orchids
                </Link>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link 
                  className={`nav-link active ${darkMode ? 'text-light' : ''}`} 
                  aria-current="page" 
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
              <Link 
                  className={`nav-link ${darkMode ? 'text-light' : ''}`} 
                  to="/About"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className={`nav-link ${darkMode ? 'text-light' : ''}`} 
                  to="/Contact"
                >
                  Contact
                </Link>
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

              {/* User Menu */}
              {user ? (
                // Đã đăng nhập
                <div className="position-relative">
                  <button
                    onClick={() => setIsShowMenu(!isShowMenu)}
                    className="btn btn-link d-flex align-items-center"
                  >
                    <img 
                      //src={user.photoURL || <FaUserCircle />} 
                      src = "../../../public/assets/img/avatar.jpg"
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px' }}
                    />
                  </button>

                  {isShowMenu && (
                    <div className={`position-absolute mt-2 end-0 rounded shadow ${darkMode ? 'bg-dark text-light' : 'bg-white'}`}
                         style={{ width: '200px', zIndex: 1050 }}>
                      <div className="px-3 py-2 border-bottom">
                        <div className="fw-bold">{user.displayName}</div>
                        <div className="small text-muted">{user.email}</div>
                      </div>
                      <Link
                        to="/profile"
                        className="dropdown-item px-3 py-2"
                        onClick={() => setIsShowMenu(false)}
                      >
                        Hồ Sơ
                      </Link>
                      <button
                        onClick={() => {
                          setIsShowMenu(false);
                          handleLogout();
                        }}
                        className="dropdown-item px-3 py-2 text-danger"
                      >
                        Đăng Xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Chưa đăng nhập
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-outline-primary d-flex align-items-center gap-2"
                >
                  <FaGoogle />
                  Đăng nhập với Google
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Notification Component */}
      {notification.message && (
        <div
          className={`position-fixed top-0 start-50 translate-middle-x mt-4 alert ${
            notification.type === 'success' ? 'alert-success' : 'alert-danger'
          }`}
          style={{ zIndex: 1060 }}
          role="alert"
        >
          {notification.message}
        </div>
      )}
    </>
  );
};

export default Nav;
