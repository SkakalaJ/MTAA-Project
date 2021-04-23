import React, { createContext, ReactNode } from 'react';
import typography from '../constants/typography';

const theme = {
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  typography,
};

export type Theme = typeof theme;

const ThemeContext = createContext(theme);

function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}> {children} </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
