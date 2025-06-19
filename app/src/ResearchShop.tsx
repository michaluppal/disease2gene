import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from './components/Layout';
import QueryWizard from './components/QueryWizard';
import UserDefinedColumns from './components/UserDefinedColumns';
import ActionBar from './components/ActionBar';
import QueryResults from './components/QueryResults';
import { fetchMockResearchResults } from './api';

interface QueryField {
  keyword: string;
  field: string;
  exactPhrase: boolean;
  operator: 'AND' | 'OR';
}

const ResearchShop: React.FC = () => {
  const [queryFields, setQueryFields] = useState<QueryField[]>([]);
  const [pmids, setPmids] = useState<string>('');
  const [columns, setColumns] = useState<Array<{ key: string; description: string }>>([]);
  const [tableData, setTableData] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRunQuery = async () => {
    setLoading(true);
    try {
      const data = await fetchMockResearchResults(queryFields, pmids);
      setTableData(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          overflowY: 'auto',
          backgroundColor: '#F5F5F7',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 3, color: '#1A2526' }}
        >
          Build Your Query
        </Typography>
        <QueryWizard
          queryFields={queryFields}
          setQueryFields={setQueryFields}
          pmids={pmids}
          setPmids={setPmids}
        />
        <UserDefinedColumns
          columns={columns}
          setColumns={setColumns}
        />
      </Box>
      <ActionBar onRunQuery={handleRunQuery} loading={loading} />
      <QueryResults loading={loading} tableData={tableData} columns={columns} />
    </Layout>
  );
};

export default ResearchShop;