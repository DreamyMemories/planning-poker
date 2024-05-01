import { PaletteMode, Theme } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";
import { createCustomTheme } from "./services/theme";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () : ThemeContextType => {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>("light");

    const theme = createCustomTheme(mode);
    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};