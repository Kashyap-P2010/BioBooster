import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`block px-3 py-2 bg-white dark:bg-gray-800 border ${
          error
            ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
            : 'border-gray-300 dark:border-gray-700 focus:ring-primary-500 focus:border-primary-500'
        } rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200 w-full ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}