import { useState } from 'react';

import { THEMES } from '../contexts/ThemeContext';

const useTheme = (initialTheme) => {
  const [theme, setTheme] = useState(initialTheme);
  return {
    theme,
    toggleTheme: () => {
      if (theme === THEMES.DARK) {
        setTheme(THEMES.LIGHT);
      } else {
        setTheme(THEMES.DARK);
      }
    },
  };
};

export default useTheme;
