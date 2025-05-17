import { Dumbbell, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Workout } from '../../types';
import { getExerciseById } from '../../data/exercises';
import { motion } from 'framer-motion';
import Button from './Button';

interface WorkoutCardProps {
  workout: Workout;
  onStart: () => void;
}

export default function WorkoutCard({ workout, onStart }: WorkoutCardProps) {
  
  const exerciseCount = workout.exercises.length;
  
 
  const totalSets = workout.exercises.reduce((acc, curr) => acc + curr.sets, 0);
  const totalRest = workout.exercises.reduce((acc, curr) => acc + (curr.sets * curr.restSeconds), 0);
  const estimatedTimeMinutes = Math.ceil((totalSets * 45 + totalRest) / 60); 
  
  
  const firstExerciseName = workout.exercises[0]?.exerciseId ? 
    getExerciseById(workout.exercises[0].exerciseId)?.name || 'Unknown Exercise' :
    'No exercises';
  
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {workout.name}
          </h3>
          {workout.forDay && (
            <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-xs font-medium px-2.5 py-0.5 rounded">
              {workout.forDay}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {workout.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Dumbbell className="w-4 h-4 mr-1" />
            <span>{exerciseCount} exercises</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            ~{estimatedTimeMinutes} min
          </div>
        </div>
        
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Starts with
          </div>
          <div className="text-sm font-medium">
            {firstExerciseName}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="primary"
            size="md"
            isFullWidth
            onClick={onStart}
            className="flex items-center justify-center"
          >
            <Play className="w-4 h-4 mr-1" />
            Start Workout
          </Button>
          
          <Link 
            to={`/workout/create?edit=${workout.id}`}
            className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium flex-grow text-center"
          >
            Edit
          </Link>
        </div>
      </div>
    </motion.div>
  );
}