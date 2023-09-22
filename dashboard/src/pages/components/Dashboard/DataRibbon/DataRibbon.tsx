import React from './index';
import { Grid } from '@mui/material';
import DataCard from '@/pages/components/Dashboard/DataCard';
import scss from './DataRibbon.module.scss';

const DataRibbon = () => {
  return (
    <Grid container gap={2} className={scss.dataRibbon}>
      <Grid>
        <DataCard
          title={"Total Marketcap"}
          value={"$25,732.53"}
          description={
            "The totals of marketcaps in each chain of stablecoin"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Total Volume"}
          value={"$5892"}
          description={"The total trading amount per day"}
        />
      </Grid>
      <Grid>
        <DataCard
          title={"Price"}
          value={"$0.94"}
          description={
            "The price of the stablecoin"
          }
        />
      </Grid>
      <Grid>
        <DataCard
          title={"% Depeg rate"}
          value={"0.06%"}
          description={"Percentage depeg rate of the stablecoin"}
        />
      </Grid>
    </Grid>
  );
};

export default DataRibbon;