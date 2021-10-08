import {
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
type textareaRef = ForwardedRef<HTMLTextAreaElement>;

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
          <div className="absolute left-0 top-0 flex w-10 h-full border border-transparent">
            <div className="z-10 flex items-center justify-center w-full h-full text-lg rounded-bl rounded-tl">
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

export const Textarea = forwardRef(
  (
    { className, children, name, label, errorMessage, ...props }: any,
    ref: textareaRef,
  ) => {
    return (
      <div className="flex flex-col mb-7">
        <label htmlFor={name} className="mb-1 text-sm">
          {label}
        </label>
        <div className="relative">
          <div className="absolute left-0 top-0 flex w-10 h-full border border-transparent">
            <div className="z-10 flex items-center justify-center w-full h-full text-lg rounded-bl rounded-tl">
              {children}
            </div>
          </div>
          <textarea
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
