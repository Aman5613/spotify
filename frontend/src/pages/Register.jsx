import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Register form submitted:', formData);
        // Handle registration logic here

        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
                fullName: {
                    firstName: formData.firstName,
                    lastName: formData.lastName
                },
                email: formData.email,
                password: formData.password
            });

            console.log("response : ", response.data.message);

            navigate('/');

        } catch (error) {
            console.log("error in registering : ", error?.response?.data?.message || error.message);
        }
    };

    const handleGoogleAuth = async () => {
        console.log('Continue with Google clicked');
        // Handle Google OAuth logic here

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
                maxWidth: '480px',
                width: '100%'
            }}>
                <div className="text-center mb-4">
                    <h2 style={{ marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Join us and start your journey
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            label="First Name"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                            label="Last Name"
                        />
                    </div>

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

                    <div className="mt-3">
                        <Button type="submit" variant="primary">
                            Create Account
                        </Button>
                    </div>

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

                    <Button
                        onClick={() => window.location.href = "http://localhost:3000/api/v1/auth/google"}
                        type="button" variant="google">
                        Continue with Google
                    </Button>
                </form>

                <p className="text-center mt-3" style={{ fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
