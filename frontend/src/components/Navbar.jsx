import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, isArtist, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                    <span>Piper</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="navbar-link">Home</Link>

                    {isArtist() && (
                        <>
                            <Link to="/artist/dashboard" className="navbar-link">Dashboard</Link>
                            <Link to="/artist/upload" className="navbar-link">Upload</Link>
                        </>
                    )}

                    <Link to="/profile" className="navbar-link">Profile</Link>

                    <button onClick={handleLogout} className="navbar-btn">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
