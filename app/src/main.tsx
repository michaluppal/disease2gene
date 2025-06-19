import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material'; // Added CssBaseline
import theme from './theme';
// import LandingPage from './components/LandingPage'; // Old landing page
import LoginPage from './components/LoginPage';
import ResearchShop from './ResearchShop';
import MarketingLandingPage from './components/MarketingLandingPage'; // Import the new marketing landing page

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styling and applies background from theme */}
      <BrowserRouter>
        <Routes>
          {/* Route for the new marketing landing page */}
          <Route path="/" element={<MarketingLandingPage />} />

          {/* Other routes remain the same */}
          <Route path="/login" element={<LoginPage />} />
          {/* Assuming /register still points to LoginPage or a dedicated RegisterPage */}
          <Route path="/register" element={<LoginPage />} /> 
          <Route path="/app" element={<ResearchShop />} />

          {/* You might want to add routes for /about-us, /pricing etc. if created */}
          {/* Example: <Route path="/about-us" element={<AboutUsPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
