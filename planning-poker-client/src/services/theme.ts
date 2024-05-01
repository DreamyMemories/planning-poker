import { PaletteMode } from '@mui/material';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const customTheme = (mode: PaletteMode | undefined) => ({
  typography : {
    "fontFamily": "Jost",
  },
  palette: {
    mode,
    primary: {
      main: '#75A1DE',
    },
    secondary: {
      main: '#d7d7d7',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: mode === 'dark' ? '#121212': '#fff',
    },
  },
});
export const createCustomTheme = (mode: PaletteMode | undefined) => createTheme(customTheme(mode));