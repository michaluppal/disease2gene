import React, { useState } from 'react';
import { Box, CircularProgress, Typography, Collapse, IconButton, Paper, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OutputTablePreview from './OutputTablePreview';

interface QueryResultsProps {
  loading: boolean;
  tableData: Array<Record<string, any>>;
  columns: Array<{ key: string; description: string }>; // Kept for consistency, though not directly used by OutputTablePreview's rendering
}

const QueryResults: React.FC<QueryResultsProps> = ({ loading, tableData, columns }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Default to open

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    // This Box acts as the container for the QueryResults section, below ActionBar
    // It doesn't need to be a Paper itself if the content inside (OutputTablePreview) is.
    // The background color is handled by the main layout's background.
    <Box sx={{ 
        p: { xs: 2, sm: 2.5 }, 
        overflowY: 'auto', 
        // borderTop: '1px solid', borderColor: 'divider', // If a visual separation is needed from ActionBar
        flexGrow: 1, // Allow it to take available space if in a flex column
        display: 'flex',
        flexDirection: 'column'
    }}>
      <Paper sx={{ p: {xs: 2, sm: 2.5}, flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Paper wraps the content */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={loading || tableData.length === 0 ? 0 : 2}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
            Output Preview
          </Typography>
          <Tooltip title={isCollapsed ? "Show Results" : "Hide Results"}>
            <IconButton onClick={toggleCollapse} size="small">
              {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Collapse in={!isCollapsed} timeout="auto" sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4, flexGrow: 1 }}>
              <CircularProgress color="primary" />
              <Typography sx={{ ml: 2, color: 'text.secondary' }}>Loading results...</Typography>
            </Box>
          ) : (
            // OutputTablePreview will handle the "No data" message if tableData is empty
            <Box sx={{flexGrow: 1}}>
                 <OutputTablePreview columns={columns} tableData={tableData} />
            </Box>
          )}
        </Collapse>
      </Paper>
    </Box>
  );
};

export default QueryResults;
