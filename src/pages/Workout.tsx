import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import WorkoutCard from '../components/ui/WorkoutCard';
import { useUser } from '../contexts/UserContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { defaultWorkoutPlans } from '../data/workoutPlans';
import { Workout as WorkoutType } from '../types';

export default function Workout() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { savedWorkouts, activeWorkout, startWorkout } = useWorkout();
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'custom' | 'teen' | 'adult' | 'senior'>('all');
  
  
  useEffect(() => {
    
    if (savedWorkouts.length === 0) {
      setWorkouts(defaultWorkoutPlans);
    } else {
      
      const allWorkoutIds = new Set(savedWorkouts.map(w => w.id));
      const filteredDefaults = defaultWorkoutPlans.filter(w => !allWorkoutIds.has(w.id));
      setWorkouts([...savedWorkouts, ...filteredDefaults]);
    }
  }, [savedWorkouts]);
  
  
  const filteredWorkouts = selectedCategory === 'all'
    ? workouts
    : workouts.filter(workout => {
        if (selectedCategory === 'custom') {
          return !workout.category || workout.category === 'custom';
        }
        return workout.category === selectedCategory;
      });
  
  
  const handleStartWorkout = (workout: WorkoutType) => {
    startWorkout(workout);
    navigate('/workout/active');
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Workouts</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose from pre-designed workouts or create your own custom plan.
        </p>
      </motion.div>
      
      {}
      {activeWorkout && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 shadow-md text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-1">Continue Your Workout</h2>
              <p className="text-white/80">
                You have an active workout in progress: <span className="font-semibold">{activeWorkout.name}</span>
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/workout/active">
                <Button variant="accent">
                  Resume
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
      
      {}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-semibold">Browse Workouts</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select a pre-designed workout or create your own
          </p>
        </div>
        <Link to="/workout/create">
          <Button variant="primary" className="w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Workout
          </Button>
        </Link>
      </div>
      
      {}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {[
            { id: 'all', name: 'All Workouts' },
            { id: 'custom', name: 'My Workouts' },
            { id: 'teen', name: 'Teen' },
            { id: 'adult', name: 'Adult' },
            { id: 'senior', name: 'Senior' },
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {}
      {filteredWorkouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onStart={() => handleStartWorkout(workout)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <h3 className="text-xl font-semibold mb-2">No workouts found</h3>
          {selectedCategory === 'custom' ? (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You haven't created any custom workouts yet.
              </p>
              <Link to="/workout/create">
                <Button variant="primary">Create Your First Workout</Button>
              </Link>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category.
            </p>
          )}
        </div>
      )}
    </div>
  );
}