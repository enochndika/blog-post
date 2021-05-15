import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  InputHTMLAttributes,
} from 'react';

interface FormProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

type InputRef = ForwardedRef<HTMLInputElement>;

export const Input = forwardRef(
  (
    { className, children, name, label, errorMessage, ...props }: FormProps,
    ref: InputRef,
  ) => {
    return (
      <div className="flex flex-col mb-7">
        <label htmlFor={name} className="mb-1 text-sm">
          {label}
        </label>
        <div className="relative">
          <div className="absolute flex border border-transparent left-0 top-0 h-full w-10">
            <div className="flex items-center justify-center rounded-tl rounded-bl z-10  text-lg h-full w-full">
              {children}
            </div>
          </div>
          <input
            {...props}
            id={name}
            name={name}
            ref={ref}
            className={`${className} text-base dark:text-black relative w-full border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none py-2 pr-2 pl-12`}
          />
        </div>
        {errorMessage && (
          <div>
            <span
              role="alert"
              className={`${className} text-red-500 -mt-3 font-medium mb-6 inline-block`}
              style={{ fontSize: 13 }}
            >
              {errorMessage}
            </span>
          </div>
        )}
      </div>
    );
  },
);
