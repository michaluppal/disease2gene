import React, { useState, useEffect, useRef } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Fade, Collapse, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ScienceIcon from '@mui/icons-material/Science'; // Example icon for a tool
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add'; // For "New Research"

// Define an interface for sidebar items
interface SidebarItem {
  name: string;
  icon: React.ReactElement;
  path?: string; // For navigation
  active?: boolean; // To indicate the current active item
}

const Sidebar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isToolsCollapsed, setIsToolsCollapsed] = useState(false); // Default to open
  const [isAccountCollapsed, setIsAccountCollapsed] = useState(true);
  const [isSettingsCollapsed, setIsSettingsCollapsed] = useState(true);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(260); // Default width
  const [isResizing, setIsResizing] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Resizing logic (remains the same)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && !isCollapsed) {
        const newWidth = e.clientX;
        if (newWidth >= 200 && newWidth <= 400) { // Min/max resize width
          setSidebarWidth(newWidth);
        }
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isCollapsed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const toggleSidebarCollapse = () => {
    setIsCollapsed(prev => {
      setSidebarWidth(prev ? 260 : 68); // Adjust collapsed width for icons
      return !prev;
    });
  };

  const toggleSectionCollapse = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(prev => !prev);
  };

  const mainTools: SidebarItem[] = [
    { name: 'Find Gene Based on Diseases', icon: <ScienceIcon fontSize="small" />, active: true },
    // Add more tools here
  ];

  const renderSection = (
    title: string,
    items: SidebarItem[],
    isSectionCollapsed: boolean,
    toggleFn: () => void,
    showAddButton?: boolean
  ) => (
    <>
      {!isCollapsed && (
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={isToolsCollapsed ? 0 : 2} mb={1} px={1}>
          <Typography variant="caption" sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </Typography>
          <Box>
            {showAddButton && (
                 <Tooltip title="New Research" placement="top">
                    <IconButton size="small" sx={{mr: 0.5}} onClick={() => console.log("New research")}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                 </Tooltip>
            )}
            <IconButton onClick={toggleFn} size="small">
                {isSectionCollapsed ? <ExpandMoreIcon fontSize="small" /> : <ExpandLessIcon fontSize="small" />}
            </IconButton>
          </Box>
        </Box>
      )}
      <Collapse in={!isSectionCollapsed || isCollapsed} timeout="auto" unmountOnExit>
        <List sx={{ py: 0 }}>
          {items.map((item) => (
            <Tooltip title={isCollapsed ? item.name : ""} placement="right" key={item.name}>
              <ListItemButton
                selected={item.active}
                sx={{
                  py: isCollapsed ? 1.5 : 1,
                  px: isCollapsed ? 'auto' : 1.5,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  minHeight: 40,
                }}
                // component={Link} to={item.path} // If using React Router for navigation
              >
                <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 36, color: item.active ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: item.active ? 500 : 400,
                      color: item.active ? 'primary.main' : 'text.primary',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Collapse>
    </>
  );

  return (
    <Fade in={isVisible} timeout={1000}>
      <Box
        ref={sidebarRef}
        sx={{
          width: sidebarWidth,
          height: '100%', // Fill height
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.paper', // Use theme's paper background
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderRight: '1px solid',
          borderColor: 'divider',
          overflowY: 'auto',
          overflowX: 'hidden', // Prevent horizontal scroll when collapsing
          position: 'relative',
          transition: 'width 0.25s ease-out',
          p: isCollapsed ? 1 : 2, // Adjust padding when collapsed
          pt: isCollapsed ? 8 : 2, // More top padding when collapsed for the toggle button
        }}
      >
        <IconButton
          onClick={toggleSidebarCollapse}
          size="small"
          sx={{
            position: 'absolute',
            top: isCollapsed ? 16 : 12, // Adjust position based on collapse state
            right: isCollapsed ? (sidebarWidth - 32) / 2 : -14, // Center when collapsed or position outside
            transform: isCollapsed ? 'none' : 'translateX(-50%)',
            backgroundColor: 'background.default', // Button background to stand out
            border: '1px solid',
            borderColor: 'divider',
            zIndex: 10,
            '&:hover': { backgroundColor: 'action.hover' },
            transition: 'right 0.25s ease-out, background-color 0.2s ease',
          }}
        >
          {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>

        {!isCollapsed && ( // Resizer handle
          <Box
            onMouseDown={handleMouseDown}
            sx={{
              position: 'absolute',
              top: 0,
              right: -5, // Position slightly outside for easier grabbing
              width: 10,
              height: '100%',
              cursor: 'ew-resize',
              zIndex: 5,
              '&:hover': { backgroundColor: 'action.hover' },
            }}
          />
        )}
        
        {renderSection('Research Tools', mainTools, isToolsCollapsed, () => toggleSectionCollapse(setIsToolsCollapsed), true)}
        {renderSection('Account', [{ name: 'Profile', icon: <AccountCircleIcon fontSize="small"/> }], isAccountCollapsed, () => toggleSectionCollapse(setIsAccountCollapsed))}
        {renderSection('Settings', [{ name: 'Preferences', icon: <SettingsIcon fontSize="small"/> }], isSettingsCollapsed, () => toggleSectionCollapse(setIsSettingsCollapsed))}
        {renderSection('History', [{ name: 'Recent Queries', icon: <HistoryIcon fontSize="small"/> }], isHistoryCollapsed, () => toggleSectionCollapse(setIsHistoryCollapsed))}

      </Box>
    </Fade>
  );
};

export default Sidebar;
