import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await login(formData.email, formData.password);

        if (result.success) {
            // Redirect based on user role
            if (result.user.role === 'artist') {
                navigate('/artist/dashboard');
            } else {
                navigate('/');
            }
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    const handleGoogleAuth = async () => {
        window.location.href = "http://localhost:3000/api/v1/auth/google";
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1042 50%, #2a1454 100%)',
            padding: '2rem 1rem'
        }}>
            <div className="card fade-in" style={{
                maxWidth: '450px',
                width: '100%'
            }}>
                <div className="text-center mb-4">
                    <h2 style={{ marginBottom: '0.5rem' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Sign in to your account
                    </p>
                </div>

                {error && (
                    <div className="alert alert-error mb-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        label="Email"
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        showPasswordToggle={true}
                        label="Password"
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginBottom: '1.5rem'
                    }}>
                        <a href="#" style={{
                            fontSize: '0.875rem',
                            color: '#667eea'
                        }}>
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>

                    <div style={{
                        position: 'relative',
                        textAlign: 'center',
                        margin: '1.5rem 0',
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'var(--border-color)'
                        }}></div>
                        <span style={{
                            position: 'relative',
                            background: 'var(--bg-card)',
                            padding: '0 1rem',
                            color: 'var(--text-muted)',
                            fontSize: '0.875rem'
                        }}>
                            OR
                        </span>
                    </div>

                    <Button onClick={() => window.location.href = "http://localhost:3000/api/v1/auth/google"} type="button" variant="google">
                        Continue with Google
                    </Button>
                </form>

                <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
                    Don't have an account?{' '}
                    <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
