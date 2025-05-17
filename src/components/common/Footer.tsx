import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  const footerClass = theme === 'dark' 
    ? 'bg-gray-800 text-gray-300' 
    : 'bg-gray-100 text-gray-700';
  
  return (
    <footer className={`py-8 ${footerClass}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">FitLife</h3>
            <p className="mb-4">Helping you achieve your fitness goals with no equipment needed.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/workouts" className="hover:underline">Workouts</a></li>
              <li><a href="/exercises" className="hover:underline">Exercise Library</a></li>
              <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
            </ul>
          </div>
          
          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Beginner's Journey</a></li>
              <li><a href="#" className="hover:underline">30-Day Challenge</a></li>
              <li><a href="#" className="hover:underline">Senior Fitness</a></li>
              <li><a href="#" className="hover:underline">Teen Strength</a></li>
            </ul>
          </div>
          
          {}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        {}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            © {new Date().getFullYear()} FitLife. Made with 
            <Heart className="inline-block h-4 w-4 mx-1 text-red-500" />
            for your fitness journey.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;