import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) => {
  const { theme } = useTheme();
  
  const baseClasses = 'rounded-lg overflow-hidden transition-all duration-200';
  
  const themeClasses = theme === 'dark'
    ? 'bg-gray-800 shadow-lg border border-gray-700'
    : 'bg-white shadow-md border border-gray-100';
  
  const hoverClasses = hoverable
    ? theme === 'dark'
      ? 'hover:shadow-xl hover:border-gray-600 hover:-translate-y-1'
      : 'hover:shadow-xl hover:border-gray-200 hover:-translate-y-1'
    : '';
  
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div
      className={`
        ${baseClasses}
        ${themeClasses}
        ${hoverClasses}
        ${clickableClass}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;