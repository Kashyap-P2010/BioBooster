import { motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHoverable?: boolean;
}

export default function Card({
  children,
  isHoverable = false,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300";
  const hoverClasses = isHoverable ? "hover:shadow-lg hover:-translate-y-1" : "";
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}