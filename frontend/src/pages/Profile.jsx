import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getProfile();
            setProfile(response.data.user || user);
            setError(null);
        } catch (err) {
            console.error('Error fetching profile:', err);
            // Fallback to local user data
            setProfile(user);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading profile...</p>
                    </div>
                ) : (
                    <div className="card">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <h1>{profile?.fullName?.firstName} {profile?.fullName?.lastName}</h1>
                            <p className="profile-role">
                                {profile?.role === 'artist' ? '🎵 Artist' : '👤 Listener'}
                            </p>
                        </div>

                        <div className="profile-info">
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <span className="info-value">{profile?.email}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">Member Since</span>
                                <span className="info-value">
                                    {profile?.createdAt
                                        ? new Date(profile.createdAt).toLocaleDateString()
                                        : 'N/A'
                                    }
                                </span>
                            </div>

                            {profile?.role === 'artist' && (
                                <div className="info-item">
                                    <span className="info-label">Total Uploads</span>
                                    <span className="info-value">
                                        {profile?.totalSongs || 0} songs
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="profile-actions mt-4">
                            <button className="btn btn-primary">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
