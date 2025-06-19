import React from 'react';
import { Select, MenuItem, TextField, Button, Box, type SelectChangeEvent } from '@mui/material';

interface QueryFieldRowProps {
  index: number;
  field: string;
  value: string;
  availableFields: string[];
  setQueryFields: React.Dispatch<React.SetStateAction<Array<{ field: string; value: string }>>>;
}

const QueryFieldRow: React.FC<QueryFieldRowProps> = ({ index, field, value, availableFields, setQueryFields }) => {
  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    const newField = event.target.value;
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, field: newField } : qf));
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, value: newValue } : qf));
  };

  const removeQueryField = () => {
    setQueryFields(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" alignItems="center" mb={1}>
      <Select
        value={field}
        onChange={handleFieldChange}
        displayEmpty
        sx={{ minWidth: 120, mr: 1 }}
      >
        <MenuItem value="" disabled>
          Select field
        </MenuItem>
        {availableFields.map(f => (
          <MenuItem key={f} value={f}>
            {f}
          </MenuItem>
        ))}
      </Select>
      <TextField
        value={value}
        onChange={handleValueChange}
        placeholder="Value"
        sx={{ mr: 1 }}
      />
      <Button variant="text" color="error" onClick={removeQueryField}>
        Remove
      </Button>
    </Box>
  );
};

export default QueryFieldRow;