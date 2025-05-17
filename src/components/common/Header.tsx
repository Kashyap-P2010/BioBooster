import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Dumbbell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Workouts', href: '/workouts' },
    { name: 'Exercises', href: '/exercises' },
    { name: 'Dashboard', href: '/dashboard' },
  ];

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? `${theme === 'dark' ? 'bg-gray-800/95 shadow-lg' : 'bg-white/95 shadow-lg backdrop-blur-sm'}` 
      : `${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`}
  `;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {}
          <div className="flex items-center">
            <Dumbbell className={`h-8 w-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className="ml-2 text-xl font-bold">FitLife</span>
          </div>
          
          {}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className={`
                      font-medium transition-colors duration-200
                      ${theme === 'dark' 
                        ? 'text-gray-200 hover:text-white' 
                        : 'text-gray-700 hover:text-blue-600'}
                    `}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {}
          <div className="flex items-center">
            {}
            <button 
              onClick={toggleTheme}
              className={`
                p-2 rounded-full transition-colors duration-200
                ${theme === 'dark' 
                  ? 'text-yellow-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-200'}
              `}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {}
            <button 
              className="ml-4 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {}
      {isMenuOpen && (
        <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${theme === 'dark' 
                    ? 'text-white hover:bg-gray-700' 
                    : 'text-gray-900 hover:bg-gray-100'}
                `}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;