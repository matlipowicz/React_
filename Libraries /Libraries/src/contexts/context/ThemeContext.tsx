import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  themeVersion: string;
  toggleTheme: () => void;
};

interface ThemeInterface {
  dark: {
    'background-color': string;
    'button-main': string;
  };
  light: {
    'background-color': string;
    'button-main': string;
  };
}
const themes: ThemeInterface = {
  dark: {
    'background-color': '#242424',
    'button-main': '#535bf2',
  },
  light: {
    'background-color': '#f2f3f5',
    'button-main': '#1a1a1a',
  },
};

export const ThemeContext = createContext<ThemeContextType>({
  themeVersion: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeVersion, setThemeVersion] = useState<keyof ThemeInterface>('light');
  const [theme, setTheme] = useState(themes[themeVersion]);

  //? Nie wiem jak typ tutaj dać
  const setCSSVariables = (theme: any) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };
  useEffect(() => {
    setCSSVariables(theme);
  });

  const toggleTheme = () => {
    if (theme === themes.dark) {
      setTheme(themes.light);
      setThemeVersion('light');
    } else {
      setTheme(themes.dark);
      setThemeVersion('dark');
    }
  };
  return (
    <ThemeContext.Provider value={{ themeVersion, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("Missing ThemeProvider, it's not wrapped in ThemeProvider");
  }
  return ctx;
};
