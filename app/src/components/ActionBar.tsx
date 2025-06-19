import React from 'react';
import { Box, Button, CircularProgress, Fade } from '@mui/material';

interface ActionBarProps {
  onRunQuery: () => void;
  loading: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ onRunQuery, loading }) => (
  <Fade in={true} timeout={800}>
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        boxShadow: '0 -2px 5px rgba(0,0,0,0.03)',
      }}
    >
      <Button
        variant="contained"
        onClick={onRunQuery}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress size={20} sx={{ color: '#FFFFFF', mr: 1 }} />
            Running...
          </>
        ) : (
          'Run Query'
        )}
      </Button>
    </Box>
  </Fade>
);

export default ActionBar;