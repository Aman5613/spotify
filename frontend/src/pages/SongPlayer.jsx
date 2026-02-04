import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';
import { songsAPI } from '../services/api';

export default function SongPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSong();
    }, [id]);

    const fetchSong = async () => {
        try {
            setLoading(true);
            const response = await songsAPI.getById(id);
            setSong(response.data.music);
            setError(null);
        } catch (err) {
            console.error('Error fetching song:', err);
            setError('Failed to load song');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading song...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => navigate(-1)} className="btn btn-primary">
                            Go Back
                        </button>
                    </div>
                ) : song ? (
                    <div className="player-page">
                        <button onClick={() => navigate(-1)} className="back-button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                            </svg>
                            Back
                        </button>

                        <div className="player-content">
                            <div className="player-artwork">
                                <img
                                    src={song.coverImageURL || '/placeholder-music.png'}
                                    alt={song.title}
                                />
                            </div>

                            <div className="player-info">
                                <h1 className="player-title">{song.title}</h1>
                                <p className="player-artist">{song.artist || 'Unknown Artist'}</p>

                                {song.description && (
                                    <p className="player-description">{song.description}</p>
                                )}

                                <div className="mt-4">
                                    <MusicPlayer song={song} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
