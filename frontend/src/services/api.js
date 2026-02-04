import axios from 'axios';

const API_BASE_URL = 'http://localhost:3200/api/music';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Songs API
export const songsAPI = {
    getAll: () => api.get('/'),
    getById: (id) => api.get(`/getMusic/${id}`),
    getArtistSongs: () => api.get('getArtistSongs'),
};

// Playlists API
export const playlistsAPI = {
    getAll: () => api.get('/getAllPlaylists'),
    getById: (id) => api.get(`/getPlaylist/${id}`),
    getArtistPlaylists: () => api.get('getArtistPlaylist'),
};

// Upload API
export const uploadAPI = {
    uploadMusic: (formData) => {
        return api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

// User API
export const userAPI = {
    getProfile: () => api.get('/user/profile'),
    updateProfile: (data) => api.put('/user/profile', data),
};

export default api;
