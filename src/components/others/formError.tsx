import React from 'react';

interface FormErrorProps {
  message: string;
  className?: string;
}
const styles = {
  fontSize: 13,
};

export const FormError = ({ message, className }: FormErrorProps) => (
  <span
    role="alert"
    className={`${className} text-red-500 -mt-3 font-medium mb-6 inline-block`}
    style={styles}
  >
    {message}
  </span>
);
