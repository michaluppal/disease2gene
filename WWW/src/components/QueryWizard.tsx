import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Grow, Collapse, IconButton, Paper, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import KeywordEntry from './KeywordEntry'; // Assuming KeywordEntry is styled appropriately

interface QueryField {
  keyword: string;
  field: string;
  exactPhrase: boolean;
  operator: 'AND' | 'OR';
}

interface QueryWizardProps {
  queryFields: QueryField[];
  setQueryFields: React.Dispatch<React.SetStateAction<QueryField[]>>;
  pmids: string;
  setPmids: React.Dispatch<React.SetStateAction<string>>;
}

const QueryWizard: React.FC<QueryWizardProps> = ({ queryFields, setQueryFields, pmids, setPmids }) => {
  const [constructedQuery, setConstructedQuery] = useState('');
  const [logicalSentence, setLogicalSentence] = useState('');
  const [isEditingQuery, setIsEditingQuery] = useState(false);
  const [editedQuery, setEditedQuery] = useState('');
  const [animateButton, setAnimateButton] = useState(false); // Keep for add keyword button
  const [isCollapsed, setIsCollapsed] = useState(false);

  // useEffect for query construction (remains the same)
  useEffect(() => {
    const queryParts = queryFields
      .map(entry => {
        const keyword = entry.keyword.trim();
        const field = entry.field;
        const exactPhrase = entry.exactPhrase;
        if (keyword && field) {
          return exactPhrase ? `"${keyword}"[${field}]` : `${keyword}[${field}]`;
        }
        return null;
      })
      .filter(part => part !== null);

    const sentenceParts = queryFields
      .map(entry => {
        const keyword = entry.keyword.trim();
        const field = entry.field;
        const exactPhrase = entry.exactPhrase;
        if (keyword && field) {
          return exactPhrase ? `"${keyword}" in ${field}` : `${keyword} in ${field}`;
        }
        return null;
      })
      .filter(part => part !== null);

    let fullQuery = '';
    if (queryParts.length > 0) {
      fullQuery = queryParts.reduce((acc, part, index) => {
        if (index === 0 || !part) return part || acc; // Handle null part
        const operator = queryFields[index -1]?.operator || 'AND'; // Ensure operator exists
        return `${acc} ${operator} ${part}`;
      }, '');

      const sentence = sentenceParts.reduce((acc, part, index) => {
         if (index === 0 || !part) return part || acc; // Handle null part
        const operator = (queryFields[index -1]?.operator || 'AND').toLowerCase();
        return `${acc} ${operator} ${part}`;
      }, '');
      setLogicalSentence(sentence);
    } else {
      setLogicalSentence('');
    }

    const pmidList = pmids.split(',').map(id => id.trim()).filter(id => id);
    if (pmidList.length > 0) {
      const pmidQuery = pmidList.map(id => `${id}[PMID]`).join(' OR ');
      fullQuery = fullQuery ? `(${fullQuery}) AND (${pmidQuery})` : pmidQuery;
    }

    setConstructedQuery(fullQuery);
    if (!isEditingQuery) { // Only update editedQuery if not currently editing
        setEditedQuery(fullQuery);
    }
  }, [queryFields, pmids, isEditingQuery]);


  const handleAddKeyword = () => {
    setQueryFields(prev => [
      ...prev,
      { keyword: '', field: 'Title/Abstract', exactPhrase: false, operator: 'AND' }
    ]);
    setAnimateButton(true); // For button animation
    setTimeout(() => setAnimateButton(false), 500);
  };

  // Other handlers (handleKeywordChange, etc.) remain the same
   const handleKeywordChange = (index: number, keyword: string) => {
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, keyword } : qf));
  };

  const handleFieldChange = (index: number, field: string) => {
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, field } : qf));
  };

  const handleExactPhraseChange = (index: number, exactPhrase: boolean) => {
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, exactPhrase } : qf));
  };

  const handleOperatorChange = (index: number, operator: 'AND' | 'OR') => {
    setQueryFields(prev => prev.map((qf, i) => i === index ? { ...qf, operator } : qf));
  };

  const handleRemoveKeyword = (index: number) => {
    setQueryFields(prev => prev.filter((_, i) => i !== index));
  };

  const handlePmidsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPmids(event.target.value);
  };


  const handleCopyQuery = () => {
    const queryToCopy = isEditingQuery ? editedQuery : constructedQuery;
    if (queryToCopy) {
      navigator.clipboard.writeText(queryToCopy).then(() => {
        // Add snackbar feedback here: "Query copied!"
        console.log('Query copied to clipboard.');
      }).catch(err => {
        console.error('Failed to copy query:', err);
      });
    }
  };

  const handleSearchPubMed = () => {
    const queryToSearch = isEditingQuery ? editedQuery : constructedQuery;
    if (queryToSearch) {
      const url = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(queryToSearch)}`;
      window.open(url, '_blank');
    }
  };

  const toggleEditQuery = () => {
    if (isEditingQuery) { // Was editing, now saving
        setConstructedQuery(editedQuery); // Apply edits
    } else { // Was not editing, now starting
        setEditedQuery(constructedQuery); // Initialize editor with current query
    }
    setIsEditingQuery(prev => !prev);
  };

  const handleEditedQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuery(event.target.value);
  };

  const toggleCollapse = () => setIsCollapsed(prev => !prev);

  return (
    <Paper sx={{ mb: 3, p: {xs: 2, sm: 2.5}, borderRadius: 3 /* theme.shape.borderRadius will be used */ }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
          Query Conditions
        </Typography>
        <Tooltip title={isCollapsed ? "Show Conditions" : "Hide Conditions"}>
            <IconButton onClick={toggleCollapse} size="small">
            {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={!isCollapsed} timeout="auto">
        {queryFields.length === 0 && (
          <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2, fontSize: '0.9rem' }}>
            Add keywords to build your query.
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            {queryFields.map((qf, index) => (
            <Grow key={index} in={true} timeout={300 + index * 100}>
                {/* KeywordEntry should be a Paper or styled Box for visual grouping */}
                <Paper variant="outlined" sx={{p: 1.5, borderRadius: 2, borderColor: 'divider' }}>
                    <KeywordEntry
                        index={index}
                        keyword={qf.keyword}
                        field={qf.field}
                        exactPhrase={qf.exactPhrase}
                        operator={qf.operator}
                        onKeywordChange={handleKeywordChange}
                        onFieldChange={handleFieldChange}
                        onExactPhraseChange={handleExactPhraseChange}
                        onOperatorChange={handleOperatorChange}
                        onRemove={handleRemoveKeyword}
                        showOperator={index < queryFields.length -1 } // Only show operator if not the last keyword
                    />
                </Paper>
            </Grow>
            ))}
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddKeyword}
          sx={{
            mt: 1, mb: 2,
            animation: animateButton ? 'bounce 0.5s ease' : 'none',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
            },
          }}
        >
          Add Keyword
        </Button>

        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 1, color: 'text.primary' }}>
            Include Specific Papers (PMID/DOI)
          </Typography>
          <TextField
            value={pmids}
            onChange={handlePmidsChange}
            fullWidth
            placeholder="e.g., 12345678, doi:10.1000/xyz123 (comma-separated)"
            size="small"
            variant="outlined"
          />
        </Box>

        {logicalSentence && !isEditingQuery && ( // Show logical sentence only when not editing
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: '0.9rem', fontStyle: 'italic', mb: 1 }}>
            <span style={{fontWeight: 500}}>Interpreted as:</span> {logicalSentence}
          </Typography>
        )}

        <TextField
            value={isEditingQuery ? editedQuery : constructedQuery}
            onChange={isEditingQuery ? handleEditedQueryChange : undefined}
            InputProps={{ readOnly: !isEditingQuery }}
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            label={isEditingQuery ? "Edit PubMed Query" : "Constructed PubMed Query"}
            size="small"
            variant="outlined"
            sx={{ mt: 1, mb: 2, fontFamily: 'monospace', fontSize: '0.85rem' }}
        />

        <Box sx={{ mt: 2, display: 'flex', gap: 1.5, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyQuery}>
            Copy Query
          </Button>
          <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearchPubMed}>
            Search PubMed
          </Button>
          <Button variant="outlined" startIcon={isEditingQuery ? <SaveIcon /> : <EditIcon />} onClick={toggleEditQuery}>
            {isEditingQuery ? 'Save & Apply Query' : 'Edit Query Manually'}
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default QueryWizard;
