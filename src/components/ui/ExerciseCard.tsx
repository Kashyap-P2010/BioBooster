import { motion } from 'framer-motion';
import { Exercise } from '../../types';
import { Link } from 'react-router-dom';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const difficultyColors = {
    beginner: 'bg-success-100 dark:bg-success-900 text-success-800 dark:text-success-300',
    intermediate: 'bg-warning-100 dark:bg-warning-900 text-warning-800 dark:text-warning-300',
    advanced: 'bg-error-100 dark:bg-error-900 text-error-800 dark:text-error-300',
  };
  
  const categoryColors = {
    'upper-body': 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300',
    'core': 'bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-300',
    'lower-body': 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-300',
    'full-body': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300',
    'mobility': 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300',
  };
  
  
  const placeholderImage = 'https://images.pexels.com/photos/4761769/pexels-photo-4761769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to={`/exercises/${exercise.id}`} className="block h-full">
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          />
          <img
            src={placeholderImage}
            alt={exercise.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${difficultyColors[exercise.difficulty]}`}>
              {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${categoryColors[exercise.category]}`}>
              {exercise.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{exercise.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {exercise.instructions}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {exercise.targetMuscles.slice(0, 3).map((muscle, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded"
              >
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </span>
            ))}
            {exercise.targetMuscles.length > 3 && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-0.5 rounded">
                +{exercise.targetMuscles.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}