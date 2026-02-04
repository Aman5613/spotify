import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import Input from '../components/Input';
import Button from '../components/Button';
import { uploadAPI } from '../services/api';

export default function ArtistUpload() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        musicFile: null,
        coverImage: null
    });
    const [previews, setPreviews] = useState({
        music: null,
        cover: null
    });
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    const handleMusicFile = (file) => {
        setFormData({ ...formData, musicFile: file });
        setPreviews({ ...previews, music: URL.createObjectURL(file) });
    };

    const handleCoverImage = (file) => {
        setFormData({ ...formData, coverImage: file });
        setPreviews({ ...previews, cover: URL.createObjectURL(file) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.musicFile || !formData.coverImage) {
            setError('Please fill all fields');
            return;
        }

        const uploadData = new FormData();
        uploadData.append('title', formData.title);
        uploadData.append('music', formData.musicFile);
        uploadData.append('coverImage', formData.coverImage);

        try {
            setUploading(true);
            setError(null);

            await uploadAPI.uploadMusic(uploadData);

            setSuccess(true);
            setTimeout(() => {
                navigate('/artist/dashboard');
            }, 2000);
        } catch (err) {
            console.error('Upload error:', err);
            setError(err?.response?.data?.message || 'Failed to upload music');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="page">
            <Navbar />

            <div className="container" style={{ paddingTop: '2rem', maxWidth: '800px' }}>
                <div className="card">
                    <h1 className="text-center mb-4">Upload Music</h1>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            Music uploaded successfully! Redirecting...
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Enter song title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            label="Song Title"
                        />

                        <FileUpload
                            label="Music File"
                            accept="audio/*"
                            onChange={handleMusicFile}
                            preview={previews.music}
                            type="audio"
                        />

                        <FileUpload
                            label="Cover Image"
                            accept="image/*"
                            onChange={handleCoverImage}
                            preview={previews.cover}
                            type="image"
                        />

                        <div className="mt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Upload Music'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
