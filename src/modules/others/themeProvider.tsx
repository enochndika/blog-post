import { useTheme } from 'next-themes';
import useMounted from '@/utils/mounted';
import SunIcon from '@/components/icons/others/sun';
import MoonIcon from '@/components/icons/others/moon';

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

const ThemeChanger = ({
  darkTheme,
  lightTheme,
  close,
  notText,
  iconClass,
}: ThemeProviderProps) => {
  const isMounted = useMounted();
  const { theme, setTheme }: UseThemeProps = useTheme();

  const setDarkTheme = () => {
    setTheme('dark');
    close ? close() : null;
  };

  const setLightTheme = () => {
    setTheme('light');
    close ? close() : null;
  };

  return (
    <>
      {isMounted && theme === 'light' ? (
        <button onClick={setDarkTheme} className="flex">
          <MoonIcon className={iconClass} />
          {!notText && darkTheme}
        </button>
      ) : (
        <button onClick={setLightTheme} className="flex">
          <SunIcon className={`${iconClass} text-yellow`} />
          {!notText && lightTheme}
        </button>
      )}
    </>
  );
};

export default ThemeChanger;
