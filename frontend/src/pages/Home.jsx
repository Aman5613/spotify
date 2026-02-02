import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0a0e27 0%, #1a1042 50%, #2a1454 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                top: '-10%',
                right: '-10%',
                animation: 'float 8s ease-in-out infinite',
                filter: 'blur(60px)'
            }}></div>
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, transparent 70%)',
                borderRadius: '50%',
                bottom: '-10%',
                left: '-10%',
                animation: 'float 6s ease-in-out infinite reverse',
                filter: 'blur(60px)'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="text-center fade-in">
                    <h1 style={{
                        fontSize: '3.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #f093fb 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Welcome to Piper
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        margin: '0 auto 3rem'
                    }}>
                        Your modern authentication experience starts here
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        <Link to="/register" style={{
                            padding: '1rem 2.5rem',
                            background: 'var(--primary-gradient)',
                            color: 'white',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                            }}>
                            Get Started
                        </Link>

                        <Link to="/login" style={{
                            padding: '1rem 2.5rem',
                            background: 'var(--bg-card)',
                            backdropFilter: 'blur(20px)',
                            color: 'white',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.background = 'var(--bg-card-hover)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'var(--bg-card)';
                            }}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }
      `}</style>
        </div>
    );
}
