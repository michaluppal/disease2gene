import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Fade, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Example icon for potential sidebar toggle

const TopBar: React.FC<{ onDrawerToggle?: () => void }> = ({ onDrawerToggle }) => { // Added optional prop for drawer toggle
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Fade in={isVisible} timeout={800}>
      <AppBar
        position="static" // Or "sticky" if you want it to stick on scroll
        elevation={0} // Remove default AppBar shadow, we'll use a border
        sx={{
          backgroundColor: 'background.paper', // Use theme's paper background for consistency
          backdropFilter: 'blur(16px) saturate(180%)', // Match paper style if transparent
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderBottom: '1px solid',
          borderColor: 'divider', // Use theme's divider color
          height: '64px', // Standard height
          transition: 'background-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important', paddingX: { xs: 2, sm: 3 } }}>
          {onDrawerToggle && ( // Conditionally render menu icon if handler is provided
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }} // Show only on smaller screens if sidebar is collapsible
            >
              <MenuIcon sx={{color: "text.primary"}}/>
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'text.primary', flexGrow: 1 }}>
            ResearchShop
          </Typography>
          {/* Add any other TopBar items here, like user profile, notifications, etc. */}
          {/* Example:
          <IconButton color="inherit">
            <AccountCircle sx={{color: "text.primary"}} />
          </IconButton>
          */}
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

export default TopBar;
