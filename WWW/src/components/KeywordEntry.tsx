import React from 'react';
import { Box, TextField, Select, MenuItem, FormControlLabel, Checkbox, Button, type SelectChangeEvent } from '@mui/material';

interface KeywordEntryProps {
  index: number;
  keyword: string;
  field: string;
  exactPhrase: boolean;
  operator: 'AND' | 'OR';
  onKeywordChange: (index: number, keyword: string) => void;
  onFieldChange: (index: number, field: string) => void;
  onExactPhraseChange: (index: number, checked: boolean) => void;
  onOperatorChange: (index: number, operator: 'AND' | 'OR') => void;
  onRemove: (index: number) => void;
  showOperator: boolean;
}

const KeywordEntry: React.FC<KeywordEntryProps> = ({
  index,
  keyword,
  field,
  exactPhrase,
  operator,
  onKeywordChange,
  onFieldChange,
  onExactPhraseChange,
  onOperatorChange,
  onRemove,
  showOperator,
}) => {
  const fields = ['Title', 'Abstract', 'Title/Abstract', 'Author', 'MeSH Terms'];

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(index, event.target.value);
  };

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    onFieldChange(index, event.target.value);
  };

  const handleExactPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onExactPhraseChange(index, event.target.checked);
  };

  const handleOperatorChange = (event: SelectChangeEvent<'AND' | 'OR'>) => {
    onOperatorChange(index, event.target.value as 'AND' | 'OR');
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={0.5}
      sx={{ backgroundColor: '#FFFFFF', p: 1, borderRadius: '6px' }}
    >
      <Box
        display="grid"
        gridTemplateColumns="250px 140px 90px 80px"
        gap={1}
        alignItems="center"
      >
        <TextField
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="Keyword"
          size="small"
          sx={{ '& .MuiInputBase-root': { fontSize: '0.9rem' } }}
        />
        <Select
          value={field}
          onChange={handleFieldChange}
          size="small"
          sx={{ fontSize: '0.9rem' }}
        >
          {fields.map(f => (
            <MenuItem key={f} value={f} sx={{ fontSize: '0.9rem' }}>
              {f}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          control={
            <Checkbox
              checked={exactPhrase}
              onChange={handleExactPhraseChange}
              color="primary"
              size="small"
            />
          }
          label="Exact"
          sx={{ '& .MuiTypography-root': { fontSize: '0.9rem' } }}
        />
        {showOperator ? (
          <Select
            value={operator}
            onChange={handleOperatorChange}
            size="small"
            sx={{ fontSize: '0.9rem' }}
          >
            <MenuItem value="AND" sx={{ fontSize: '0.9rem' }}>AND</MenuItem>
            <MenuItem value="OR" sx={{ fontSize: '0.9rem' }}>OR</MenuItem>
          </Select>
        ) : (
          <Box />
        )}
      </Box>
      <Button
        variant="text"
        color="error"
        onClick={() => onRemove(index)}
        size="small"
        sx={{ fontSize: '0.9rem', padding: '2px 4px', minWidth: '60px' }}
      >
        Remove
      </Button>
    </Box>
  );
};

export default KeywordEntry;