import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <HelpCircle className="w-12 h-12 text-gray-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button variant="primary" className="flex items-center mx-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}