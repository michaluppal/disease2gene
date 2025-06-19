import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grow, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface Column {
  key: string;
  description: string;
}

interface UserDefinedColumnsProps {
  columns: Column[];
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const UserDefinedColumns: React.FC<UserDefinedColumnsProps> = ({ columns, setColumns }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const addColumn = () => {
    setColumns(prev => [...prev, { key: `customCol${prev.length + 1}`, description: 'New Description' }]);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <Box sx={{ mb: 3, p: 2, borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 600, color: '#1A2526' }}>
          User Defined Columns
        </Typography>
        <IconButton onClick={toggleCollapse} size="small">
          {isCollapsed ? <ExpandMoreIcon sx={{ color: '#0A84FF' }} /> : <ExpandLessIcon sx={{ color: '#0A84FF' }} />}
        </IconButton>
      </Box>
      <Collapse in={!isCollapsed}>
        {columns.length === 0 && (
          <Typography sx={{ color: '#4A5E6D', fontStyle: 'italic', fontSize: '0.9rem' }}>
            No custom columns defined.
          </Typography>
        )}
        {columns.map((col, index) => (
          <Grow key={index} in={true} timeout={500 + index * 100}>
            <Paper sx={{ p: 1.5, mb: 1, borderRadius: '8px' }}>
              <Typography sx={{ color: '#1A2526', fontSize: '0.9rem' }}>
                {col.key}: {col.description}
              </Typography>
              <Button
                size="small"
                onClick={() => setColumns(prev => prev.filter((_, i) => i !== index))}
                sx={{ textTransform: 'none', color: '#FF4D4F', mt: 0.5 }}
              >
                Remove
              </Button>
            </Paper>
          </Grow>
        ))}
        <Button variant="outlined" onClick={addColumn}>
          Add Column
        </Button>
      </Collapse>
    </Box>
  );
};

export default UserDefinedColumns;