import React, { createContext } from 'react';

import useTheme from '../hooks/useTheme';

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

const ThemeContext = createContext({});

const ThemeProvider = ({
  children,
  initialTheme,
}) => {
  const state = useTheme(initialTheme);
  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
};

export {
  ThemeContext,
  ThemeProvider,
  THEMES,
};
