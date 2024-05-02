import { Grid } from '@mui/material';
import { FunctionComponent } from 'react';
import { useTheme } from '../../ThemeContext';
import { MaterialUISwitch } from '../../components/DarkModeButton';
import { CreateGame } from '../../components/Poker/CreateGame/CreateGame';
import './HomePage.css';

export const HomePage : FunctionComponent = () => {
  const {theme, toggleTheme } = useTheme();

  return (
    <>
      <Grid container direction='column' justifyItems='center' alignItems='center'>
        <Grid item xs={12} style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <MaterialUISwitch checked={theme.palette.mode === "dark"} onClick={toggleTheme} />
        </Grid>
        <Grid item sm={12} lg={6}>
          <div className='HomePageContainer'>{<CreateGame/>}</div>
        </Grid>
      </Grid>
    </>
  );
};



export default HomePage;