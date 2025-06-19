import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ColumnRowProps {
  index: number;
  keyValue: string;
  description: string;
  setColumns: React.Dispatch<React.SetStateAction<Array<{ key: string; description: string }>>>;
}

const ColumnRow: React.FC<ColumnRowProps> = ({ index, keyValue, description, setColumns }) => {
  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = event.target.value;
    setColumns(prev => prev.map((col, i) => i === index ? { ...col, key: newKey } : col));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setColumns(prev => prev.map((col, i) => i === index ? { ...col, description: newDescription } : col));
  };

  const removeColumn = () => {
    setColumns(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <TextField
        value={keyValue}
        onChange={handleKeyChange}
        placeholder="Column Key"
        sx={{ mr: 1, minWidth: 120 }}
      />
      <TextField
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
        sx={{ mr: 1, minWidth: 200 }}
      />
      <Button variant="text" color="error" onClick={removeColumn}>
        Remove
      </Button>
    </Box>
  );
};

export default ColumnRow;