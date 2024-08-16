'use client';

import React from 'react';
import { useTheme } from '../contexts/theme-context.tsx';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'light' | 'dark');
  };

  return (
    <div>
      <label htmlFor="theme-select">Select Theme: </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleThemeChange}
        className={`theme-selector ${theme}`}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSelector;
