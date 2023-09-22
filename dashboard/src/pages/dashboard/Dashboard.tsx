import React from 'react';
import { Box } from '@mui/material';
import DataRibbon from '@/pages/components/Dashboard/DataRibbon';
import TransactionsPerDay from '@/pages/components/Dashboard/TransactionsPerDay';
import TransactionBottomRow from '@/pages/components/Dashboard/TransactionBottomRow';
import Grid from '@mui/material/Grid';

const Dashboard = () => {
  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
        <TransactionsPerDay />
      </Grid>
      <TransactionBottomRow />
    </Box>
  );
};
export default Dashboard;