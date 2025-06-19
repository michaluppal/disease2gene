import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

      {/* ResearchShop Logo - remains unchanged */}
      <Fade in={isVisible} timeout={1000}>
        <Typography
          variant="h1"
          sx={{
            fontSize: '4rem',
            fontWeight: 800,
            color: '#FFFFFF',
            textShadow: '0 0 15px rgba(10, 132, 255, 0.8)',
            animation: 'glowAnimation 1.5s ease-in-out infinite', // Existing text glow
            '@keyframes glowAnimation': { // Existing keyframes for text glow
              '0%': { textShadow: '0 0 15px rgba(10, 132, 255, 0.8)' },
              '50%': { textShadow: '0 0 25px rgba(10, 132, 255, 1)' },
              '100%': { textShadow: '0 0 15px rgba(10, 132, 255, 0.8)' },
            },
            mb: 4,
            zIndex: 1, // Ensures logo is above the overlay and background
          }}
        >
          ResearchShop
        </Typography>
      </Fade>

      {/* Login and Register Buttons - remains unchanged */}
      <Fade in={isVisible} timeout={1500}>
        <Box sx={{ display: 'flex', gap: 2, zIndex: 1 }}> {/* Ensures buttons are above overlay */}
          <Button
            component={Link}
            to="/login"
            variant="contained"
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
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #FF2D55 0%, #FF6B88 100%)',
              color: '#FFFFFF',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '10px 30px',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 0 20px rgba(255, 45, 85, 0.8)',
                background: 'linear-gradient(90deg, #FF1A3D 0%, #FF5570 100%)',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default LandingPage;
