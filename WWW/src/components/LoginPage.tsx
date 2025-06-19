import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Fade, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please fill in both username and password.');
      setIsLoading(false);
      return;
    }

    // Mock login logic
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        navigate('/app');
      } else {
        setError('Invalid username or password.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden', // Important to contain the gradient animation
        margin: 0,
        padding: 0,
        // Animated Gradient Background
        background: 'linear-gradient(45deg, #ff6200, #8a2be2, #ff0055, #00c6ff)', // Enhanced gradient
        backgroundSize: '400% 400%', // Make the background larger for animation
        animation: 'gradientAnimation 15s ease infinite',
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      {/* Overlay for Readability - remains unchanged */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.3)', // Keeps text legible over the animation
          zIndex: 0,
          margin: 0,
          padding: 0,
        }}
      />

      {/* Login Form - remains unchanged */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            p: 4,
            width: { xs: '90%', sm: 400 },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            zIndex: 1, // Ensures form is above the overlay and background
            border: 'none',
          }}
          component="form"
          onSubmit={handleLogin}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1A2526',
              mb: 3,
            }}
          >
            Login to ResearchShop
          </Typography>
          {error && (
            <Typography sx={{ color: '#FF4D4F', mb: 2, fontSize: '0.9rem' }} aria-live="polite">
              {error}
            </Typography>
          )}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            disabled={isLoading}
            inputProps={{ 'aria-label': 'Username' }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            disabled={isLoading}
            inputProps={{ 'aria-label': 'Password' }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              background: 'linear-gradient(90deg, #0A84FF 0%, #5AB9FF 100%)',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '10px 30px',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 0 20px rgba(10, 132, 255, 0.8)',
                background: 'linear-gradient(90deg, #006CFF 0%, #4A9FFF 100%)',
              },
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ color: '#FFFFFF' }} />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
          <Typography sx={{ mt: 2, color: '#4A5E6D', fontSize: '0.9rem' }}>
            Don’t have an account? <Link to="/register" style={{ color: '#0A84FF' }}>Register</Link>
          </Typography>
        </Box>
      </Fade>
    </Box>
  );
};

export default LoginPage;
