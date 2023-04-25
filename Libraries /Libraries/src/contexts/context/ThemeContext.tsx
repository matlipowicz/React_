import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  themeVersion: string;
  toggleTheme: () => void;
};
// TODO: Ogarnij Record w TS
type ThemeObj = Record<'background-color' | 'button-main', string>;

interface ThemeInterface {
  dark: ThemeObj;
  light: ThemeObj;
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

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeVersion, setThemeVersion] = useState<keyof ThemeInterface>('light');
  const [theme, setTheme] = useState(themes[themeVersion]);

  //? Nie wiem jak typ tutaj dać
  const setCSSVariables = (theme: ThemeObj) => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value as keyof typeof theme]);
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
