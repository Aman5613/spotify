import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MusicPlayer from '../components/MusicPlayer';
import { playlistsAPI } from '../services/api';

export default function PlaylistPlayer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlaylist();
    }, [id]);

    const fetchPlaylist = async () => {
        try {
            setLoading(true);
            const response = await playlistsAPI.getById(id);
            setPlaylist(response.data.playlist);
            setError(null);
        } catch (err) {
            console.error('Error fetching playlist:', err);
            setError('Failed to load playlist');
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        if (currentSongIndex < playlist.songs.length - 1) {
            setCurrentSongIndex(currentSongIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentSongIndex > 0) {
            setCurrentSongIndex(currentSongIndex - 1);
        }
    };

    const handleSongClick = (index) => {
        setCurrentSongIndex(index);
    };

    const currentSong = playlist?.songs?.[currentSongIndex];

    return (
        <div className="page">
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading playlist...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => navigate(-1)} className="btn btn-primary">
                            Go Back
                        </button>
                    </div>
                ) : playlist ? (
                    <div className="playlist-page">
                        <button onClick={() => navigate(-1)} className="back-button">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                            </svg>
                            Back
                        </button>

                        <div className="playlist-header">
                            <div className="playlist-artwork">
                                <img
                                    src={playlist.coverImageURL || currentSong?.coverImageURL || '/placeholder-playlist.png'}
                                    alt={playlist.title}
                                />
                            </div>
                            <div>
                                <h1>{playlist.title}</h1>
                                <p className="playlist-meta">
                                    {playlist.songs?.length || 0} songs
                                </p>
                                {playlist.description && (
                                    <p className="playlist-description">{playlist.description}</p>
                                )}
                            </div>
                        </div>

                        {currentSong && (
                            <div className="current-player">
                                <h2>Now Playing: {currentSong.title}</h2>
                                <MusicPlayer
                                    song={currentSong}
                                    onNext={currentSongIndex < playlist.songs.length - 1 ? handleNext : null}
                                    onPrevious={currentSongIndex > 0 ? handlePrevious : null}
                                />
                            </div>
                        )}

                        <div className="playlist-tracks">
                            <h3>Tracks</h3>
                            <div className="track-list">
                                {playlist.songs?.map((song, index) => (
                                    <div
                                        key={song._id || index}
                                        className={`track-item ${index === currentSongIndex ? 'active' : ''}`}
                                        onClick={() => handleSongClick(index)}
                                    >
                                        <div className="track-number">{index + 1}</div>
                                        <div className="track-cover">
                                            <img src={song.coverImageURL || '/placeholder-music.png'} alt={song.title} />
                                        </div>
                                        <div className="track-info">
                                            <div className="track-title">{song.title}</div>
                                            <div className="track-artist">{song.artist || 'Unknown'}</div>
                                        </div>
                                        {index === currentSongIndex && (
                                            <div className="track-playing">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
