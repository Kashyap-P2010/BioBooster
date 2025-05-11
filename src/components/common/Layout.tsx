import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  Trophy, 
  Users, 
  User, 
  LogOut,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home', requireAuth: false },
    { to: '/dashboard', icon: <Dumbbell size={20} />, label: 'Dashboard', requireAuth: true },
    { to: '/exercises', icon: <Dumbbell size={20} />, label: 'Exercises', requireAuth: true },
    { to: '/planner', icon: <Calendar size={20} />, label: 'Planner', requireAuth: true },
    { to: '/challenges', icon: <Trophy size={20} />, label: 'Challenges', requireAuth: true },
    { to: '/friends', icon: <Users size={20} />, label: 'Friends', requireAuth: true },
    { to: '/profile', icon: <User size={20} />, label: 'Profile', requireAuth: true },
  ];

  // Filter items based on authentication status
  const filteredNavItems = navItems.filter(
    item => !item.requireAuth || (item.requireAuth && isAuthenticated)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-primary-500" />
            <span className="text-xl font-bold text-primary-500">BioBooster</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {filteredNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-1 py-2 transition-colors hover:text-primary-500 ${
                  location.pathname === item.to ? 'text-primary-500 font-medium' : 'text-gray-600'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 py-2 text-gray-600 transition-colors hover:text-primary-500"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 py-2 text-gray-600 transition-colors hover:text-primary-500"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="container-custom py-2 flex flex-col">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 py-3 px-2 transition-colors hover:bg-gray-100 rounded ${
                    location.pathname === item.to ? 'text-primary-500 font-medium' : 'text-gray-600'
                  }`}
                  onClick={closeMobileMenu}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="flex items-center space-x-2 py-3 px-2 text-gray-600 transition-colors hover:bg-gray-100 rounded"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="flex items-center space-x-2 py-3 px-2 text-gray-600 transition-colors hover:bg-gray-100 rounded"
                  onClick={closeMobileMenu}
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BioBooster</h3>
              <p className="text-gray-300">
                Stay fit at home without equipment. Your body is your gym.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/exercises" className="text-gray-300 hover:text-white">Exercises</Link></li>
                <li><Link to="/challenges" className="text-gray-300 hover:text-white">Challenges</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">
                Have questions or feedback? <br />
                <a href="mailto:info@biobooster.com" className="text-primary-300 hover:text-primary-200">
                  info@biobooster.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BioBooster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;