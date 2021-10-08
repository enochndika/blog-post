import {
  ForwardedRef,
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

interface BtnPropsWithChildren {}

export interface BtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BtnPropsWithChildren {
  block?: boolean;
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'danger' | 'dark';
  disabled?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

type ButtonRef = ForwardedRef<HTMLButtonElement>;

const style = {
  colors: {
    dark: `bg-btn focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900`,
    danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
    primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 focus:ring-offset-blue-100`,
  },
  size: {
    sm: 'px-6 py-1.5 text-sm ',
    md: 'px-6 py-2',
    lg: 'px-6 py-3 text-lg ',
  },
};

export const Button = forwardRef(
  (
    { color, className, size, disabled, children, ...props }: BtnProps,
    ref: ButtonRef,
  ) => (
    <button
      {...props}
      ref={ref}
      className={`${style.colors[color]} ${style.size[size]} ${className}${
        disabled
          ? 'opacity-60 cursor-not-allowed'
          : 'transition ease-in duration-200'
      } 
      text-white focus:outline-none shadow rounded font-normal `}
    >
      {children}
    </button>
  ),
);

/* The classname of const button is so long, that's why I split them into four parts*/
const customBtnStyle = {
  light: `py-1 mb-5 mt-4 font-medium rounded px-5 border border-gray-400 border-solid transition ease-in duration-200 text-gray-700 leading-7 tracking-widest rounded flex`,
  dark: `dark:text-white mt-4 focus:outline-none dark:active:bg-gray-900 active:bg-gray-100`,
};

export const button = `${customBtnStyle.light} ${customBtnStyle.dark}`;
