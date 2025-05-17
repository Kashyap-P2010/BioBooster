import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-2 focus:ring-primary-300 shadow-sm",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 focus:ring-2 focus:ring-secondary-300 shadow-sm",
    accent: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 focus:ring-2 focus:ring-accent-300 shadow-sm",
    outline: "bg-transparent border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
  };
  
  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5"
  };
  
  const widthClass = isFullWidth ? "w-full" : "";
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <motion.button
      className={classes}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}