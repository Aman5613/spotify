import { useNavigate } from 'react-router-dom';

export default function PlaylistCard({ playlist }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/playlist/${playlist._id}`);
    };

    return (
        <div className="playlist-card" onClick={handleClick}>
            <div className="playlist-card-image">
                <img
                    src={playlist.coverImage || '/placeholder-playlist.png'}
                    alt={playlist.name}
                />
                <div className="playlist-card-overlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
            <div className="playlist-card-content">
                <h3 className="playlist-card-title">{playlist.name}</h3>
                <p className="playlist-card-info">
                    {playlist.songs?.length || 0} songs
                </p>
            </div>
        </div>
    );
}
