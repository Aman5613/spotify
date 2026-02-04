import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/login', {
                email,
                password
            });

            const { token, user } = response.data;

            setToken(token);
            setUser(user);

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true, user };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error?.response?.data?.message || error.message
            };
        }
    };

    const register = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', formData);

            const { token, user } = response.data;

            if (token && user) {
                setToken(token);
                setUser(user);

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return { success: true, user };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error?.response?.data?.message || error.message
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const isArtist = () => {
        return user?.role === 'artist';
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated,
        isArtist,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
