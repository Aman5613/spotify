import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireArtist = false }) {
    const { isAuthenticated, isArtist } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    if (requireArtist && !isArtist()) {
        return <Navigate to="/" replace />;
    }

    return children;
}
