import { useNavigate } from 'react-router-dom';

export default function MusicCard({ song }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/song/${song._id}`);
    };

    return (
        <div className="music-card" onClick={handleClick}>
            <div className="music-card-image">
                <img
                    src={song.coverImageURL || '/placeholder-music.png'}
                    alt={song.title}
                />
                <div className="music-card-overlay">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>
            <div className="music-card-content">
                <h3 className="music-card-title">{song.title}</h3>
                <p className="music-card-artist">{song.artist || 'Unknown Artist'}</p>
            </div>
        </div>
    );
}
