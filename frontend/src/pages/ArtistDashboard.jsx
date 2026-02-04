import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MusicCard from '../components/MusicCard';
import PlaylistCard from '../components/PlaylistCard';
import { songsAPI, playlistsAPI } from '../services/api';

export default function ArtistDashboard() {
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArtistContent();
    }, []);

    const fetchArtistContent = async () => {
        try {
            setLoading(true);
            const [songsResponse, playlistsResponse] = await Promise.all([
                songsAPI.getArtistSongs(),
                playlistsAPI.getArtistPlaylists()
            ]);

            setSongs(songsResponse.data.songs || []);
            setPlaylists(playlistsResponse.data.playlists || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching artist content:', err);
            setError('Failed to load your content');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <div className="dashboard-header">
                    <h1>Artist Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your music and playlists</p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading your content...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={fetchArtistContent} className="btn btn-primary">
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        <section className="content-section">
                            <div className="section-header">
                                <h2>Your Songs</h2>
                                <span className="section-count">{songs.length} songs</span>
                            </div>
                            {songs.length > 0 ? (
                                <div className="music-grid">
                                    {songs.map((song) => (
                                        <MusicCard key={song._id} song={song} />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>No songs uploaded yet</p>
                                    <a href="/artist/upload" className="btn btn-primary">
                                        Upload Your First Song
                                    </a>
                                </div>
                            )}
                        </section>

                        <section className="content-section">
                            <div className="section-header">
                                <h2>Your Playlists</h2>
                                <span className="section-count">{playlists.length} playlists</span>
                            </div>
                            {playlists.length > 0 ? (
                                <div className="music-grid">
                                    {playlists.map((playlist) => (
                                        <PlaylistCard key={playlist._id} playlist={playlist} />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>No playlists created yet</p>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}
