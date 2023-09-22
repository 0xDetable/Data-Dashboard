import React from "react";
import { Box } from "@mui/material";
import DataRibbon from '@/pages/components/Dashboard/DataRibbon';
import Grid from "@mui/material/Grid";

const Dashboard = () => {
  return (
    <Box>
      <Grid container gap={4} marginTop={2}>
        <DataRibbon />
      </Grid>
    </Box>
  );
};
export default Dashboard;