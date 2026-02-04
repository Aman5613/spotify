import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ArtistDashboard from './pages/ArtistDashboard';
import ArtistUpload from './pages/ArtistUpload';
import SongPlayer from './pages/SongPlayer';
import PlaylistPlayer from './pages/PlaylistPlayer';

// Component to handle root redirect based on auth status
function RootRedirect() {
  const { isAuthenticated, isArtist } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (isArtist()) {
    return <Navigate to="/artist/dashboard" replace />;
  }

  return <Home />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RootRedirect />
          </ProtectedRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/song/:id"
        element={
          <ProtectedRoute>
            <SongPlayer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <PlaylistPlayer />
          </ProtectedRoute>
        }
      />

      {/* Artist-Only Routes */}
      <Route
        path="/artist/dashboard"
        element={
          <ProtectedRoute requireArtist={true}>
            <ArtistDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/artist/upload"
        element={
          <ProtectedRoute requireArtist={true}>
            <ArtistUpload />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;