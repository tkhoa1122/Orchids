import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaUserMd, FaClipboardList } from 'react-icons/fa';
import Nav from '../Navbar/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfileLayout.css';

export const ProfileLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-vh-100">
            {/* Navbar */}
            <Nav />

            <div className="d-flex position-relative">
                {/* Sidebar - Fixed position */}
                <aside className="shadow-sm border-end p-3 dark-mode-bg position-fixed" 
                       style={{ 
                           width: '250px', 
                           height: 'calc(100vh - 56px)',
                           top: '56px',
                           overflowY: 'auto',
                           zIndex: 1000
                       }}>
                    <h5 className="text-center fw-bold mb-4 dark-mode-text">Dashboard</h5>
                    <nav className="d-flex flex-column gap-3">
                        <button
                            onClick={() => navigate('/Profile')}
                            className={`btn text-start d-flex align-items-center gap-2 py-2 px-3 w-100 ${
                                isActive('/Profile') ? 'btn-primary text-white' : 'btn-outline-secondary dark-mode-btn'
                            }`}
                        >
                            <FaUserMd />
                            <span>Profile</span>
                        </button>

                        <button
                            onClick={() => navigate('/OrchidManagement')}
                            className={`btn text-start d-flex align-items-center gap-2 py-2 px-3 w-100 ${
                                isActive('/OrchidManagement') ? 'btn-primary text-white' : 'btn-outline-secondary dark-mode-btn'
                            }`}
                        >
                            <FaClipboardList />
                            <span>Orchid Management</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content - With margin to avoid sidebar overlap */}
                <main className="flex-grow-1 dark-mode-bg" style={{ marginLeft: '250px', minHeight: 'calc(100vh - 56px)' }}>
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
