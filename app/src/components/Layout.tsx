import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F5F5F7' }}>
    <CssBaseline />
    <TopBar />
    <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </Box>
    </Box>
  </Box>
);

export default Layout;