import { useTheme } from 'next-themes';
import { useMounted } from '../utils/mounted';
import { MoonIcon, SunIcon } from '../components/ui/icons';

interface ThemeProviderProps {
  iconClass?: string;
  close?: () => void;
  lightTheme: string;
  darkTheme: string;
  notText?: boolean;
}

interface UseThemeProps {
  theme?: string;
  setTheme?: (theme: string) => void;
}

export const ThemeChanger = ({
  darkTheme,
  lightTheme,
  close,
  notText,
  iconClass,
}: ThemeProviderProps) => {
  const { theme, setTheme }: UseThemeProps = useTheme();
  const isMounted = useMounted();

  const setDarkTheme = () => {
    setTheme('dark');
    close ? close() : null;
  };
  const setLightTheme = () => {
    setTheme('light');
    close ? close() : null;
  };
  return (
    <div>
      {isMounted && theme === 'light' && (
        <div onClick={setDarkTheme} className="flex">
          <MoonIcon className={iconClass} />
          {!notText && darkTheme}
        </div>
      )}
      {isMounted && theme === 'dark' && (
        <div onClick={setLightTheme} className="flex">
          <SunIcon className={`${iconClass} text-yellow`} />
          {!notText && lightTheme}
        </div>
      )}
    </div>
  );
};
