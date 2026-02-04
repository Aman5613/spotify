import { useState } from 'react';

export default function FileUpload({ label, accept, onChange, preview, type = 'file' }) {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file) => {
        setFileName(file.name);
        onChange(file);
    };

    return (
        <div className="form-group">
            {label && <label className="form-label">{label}</label>}
            <div
                className={`file-upload ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="file-upload-input"
                    id={`file-${label}`}
                />
                <label htmlFor={`file-${label}`} className="file-upload-label">
                    {preview ? (
                        <div className="file-preview">
                            {type === 'image' && preview && (
                                <img src={preview} alt="Preview" className="preview-image" />
                            )}
                            {type === 'audio' && preview && (
                                <audio controls src={preview} className="preview-audio" />
                            )}
                        </div>
                    ) : (
                        <>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <p className="file-upload-text">
                                {fileName || 'Drag and drop or click to upload'}
                            </p>
                            <p className="file-upload-hint">
                                {accept}
                            </p>
                        </>
                    )}
                </label>
            </div>
        </div>
    );
}
