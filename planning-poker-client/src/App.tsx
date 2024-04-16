
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import JoinPage from './pages/JoinPage/JoinPage';
import { theme } from './services/theme';

function App() {
  return (
    <div className='LightTheme'>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path='/game/:id' element={<GamePage />} />
              <Route path='/join/:id' element={<JoinPage />} />
              <Route path='/*' element={<HomePage />} />
            </Routes>
          </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;