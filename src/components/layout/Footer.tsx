import { Dumbbell, Facebook, Github, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text">
                BioBooster
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Your personal fitness companion for customized workouts, progress tracking, and achieving your fitness goals.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/zeshenofficial/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/zeshenofficial/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/zeshenofficial/" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com/Kashyap-P2010/BioBooster" className="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

         
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Exercise Library
                </Link>
              </li>
              <li>
                <Link to="/workout" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Workouts
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {currentYear} BioBooster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}