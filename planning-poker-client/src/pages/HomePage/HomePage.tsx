import { Grid } from '@mui/material';
import React, { FunctionComponent, ReactNode } from 'react';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import './HomePage.css';

export const HomePage : FunctionComponent = () => {

  return (
    <>
      <Grid container direction='column' justifyItems='center' alignItems='center'>
        <Grid item sm={12} lg={6}>
          <div className='HomePageContainer'>{<CreateGame/>}</div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;