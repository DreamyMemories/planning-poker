import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CustomThemeProvider, useTheme } from "./ThemeContext";
import { GamePage } from "./pages/GamePage/GamePage";
import HomePage from "./pages/HomePage/HomePage";
import JoinPage from "./pages/JoinPage/JoinPage";

function App() {
  return (
    <CustomThemeProvider>
      <AppInner />
    </CustomThemeProvider>
  );
}

function AppInner() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/join/:id" element={<JoinPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
