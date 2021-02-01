import {
  ForwardedRef,
  forwardRef,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

interface BtnPropsWithChildren {}

export interface BtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BtnPropsWithChildren {
  block?: boolean;
  children: ReactNode;
  className?: string;
  color?: "primary" | "danger" | "dark";
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
}

type ButtonRef = ForwardedRef<HTMLButtonElement>;

const colors = {
  dark: `bg-btn focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900`,
  danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
  primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 focus:ring-offset-blue-100`,
};

const sizes = {
  sm: "px-6 py-1.5 text-sm ",
  md: "px-6 py-2",
  lg: "px-6 py-3 text-lg ",
};

export const Button = forwardRef(
  (
    { color, className, size, disabled, children, ...props }: BtnProps,
    ref: ButtonRef
  ) => (
    <button
      {...props}
      ref={ref}
      className={`${colors[color]} ${sizes[size]} ${className} ${
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "transition ease-in duration-200"
      } text-white focus:outline-none shadow rounded font-normal `}
    >
      {children}
    </button>
  )
);

/* The classname of const button is so long, that's why I split them into four parts*/
const one = `py-1 mb-5 rounded px-5 border border-gray-400 border-solid transition ease-in duration-200`;
const two = `focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-100`;
const three = `font-medium dark:text-white mt-4 focus:outline-none focus:bg-gray-100 dark:focus:bg-transparent`;
const four = `text-gray-700 leading-7 tracking-widest rounded flex dark:focus:ring-offset-gray-900`;

export const button = `${one} ${two} ${three} ${four}`;
