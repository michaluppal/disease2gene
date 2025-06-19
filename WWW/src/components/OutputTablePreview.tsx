import React from 'react';
import { Box, Typography, Fade, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

interface OutputTablePreviewProps {
  columns: Array<{ key: string; description: string }>; // Added columns prop
  tableData: Array<Record<string, any>>;
}

const OutputTablePreview: React.FC<OutputTablePreviewProps> = ({ columns, tableData }) => (
  <Fade in={true} timeout={800}>
    <Box>
      {tableData.length > 0 ? (
        <TableContainer component={Paper} variant="outlined" sx={{backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}}>
          <Table sx={{ minWidth: 650 }} aria-label="output preview table">
            <TableHead>
              <TableRow>
                {/* If you want to use the 'columns' prop to define headers, you'd map over 'columns' here.
                    Otherwise, if headers are derived from tableData keys: */}
                {Object.keys(tableData[0] || {}).map(key => (
                  <TableCell key={key} align="left">
                    {/* Find a matching description from the columns prop if available, otherwise use the key */}
                    { columns.find(col => col.key === key)?.description || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.keys(tableData[0] || {}).map((key, cellIndex) => ( // Ensure consistent key order
                    <TableCell key={cellIndex} align="left">
                      {String(row[key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center', py: 3 }}>
          No data to display.
        </Typography>
      )}
    </Box>
  </Fade>
);

export default OutputTablePreview;
