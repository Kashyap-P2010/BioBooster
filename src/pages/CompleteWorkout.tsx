import { motion } from 'framer-motion';
import { ClipboardCheck, Clock, Dumbbell, FlameIcon, Home, RotateCcw, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { getExerciseById } from '../data/exercises';
import { WorkoutHistory } from '../types';

export default function CompleteWorkout() {
  const navigate = useNavigate();
  const { activeWorkout, completeWorkout } = useWorkout();
  const { addWorkoutToHistory, user } = useUser();
  const [completedWorkout, setCompletedWorkout] = useState<WorkoutHistory | null>(null);
  
  useEffect(() => {
    
    if (!activeWorkout) {
      if (!completedWorkout) {
        navigate('/workout');
      }
      return;
    }
    
    
    const workoutId = activeWorkout.id;
    const workoutName = activeWorkout.name;
    
    
    
    const totalSets = activeWorkout.exercises.reduce((acc, curr) => acc + curr.sets, 0);
    const totalRest = activeWorkout.exercises.reduce((acc, curr) => acc + (curr.sets * curr.restSeconds), 0);
    const durationMinutes = Math.ceil((totalSets * 45 + totalRest) / 60); 
    
    
    
    const caloriesBurned = Math.floor(durationMinutes * 8);
    
    
    const workoutHistory: WorkoutHistory = {
      id: Date.now().toString(36),
      workoutId,
      workoutName,
      date: new Date().toISOString(),
      duration: durationMinutes,
      caloriesBurned,
      exercises: activeWorkout.exercises.map(ex => ({
        exerciseId: ex.exerciseId,
        sets: ex.sets,
        reps: ex.reps
      }))
    };
    
    
    addWorkoutToHistory(workoutHistory);
    setCompletedWorkout(workoutHistory);
    
    
    completeWorkout();
  }, [activeWorkout, completeWorkout, addWorkoutToHistory, navigate]);
  
  if (!completedWorkout) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
        </div>
      </div>
    );
  }
  
  
  const exerciseSummary: Record<string, number> = {};
  
  completedWorkout.exercises.forEach(ex => {
    const exercise = getExerciseById(ex.exerciseId);
    if (exercise) {
      exercise.targetMuscles.forEach(muscle => {
        if (exerciseSummary[muscle]) {
          exerciseSummary[muscle] += ex.sets;
        } else {
          exerciseSummary[muscle] = ex.sets;
        }
      });
    }
  });
  
  
  const totalSets = completedWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const totalReps = completedWorkout.exercises.reduce((acc, ex) => acc + (ex.sets * ex.reps), 0);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success-100 dark:bg-success-900 text-success-600 dark:text-success-400 mb-4">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Great job! You've completed {completedWorkout.workoutName}.
          </p>
        </motion.div>
        
        {}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Workout Summary</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-2xl font-bold">{completedWorkout.duration} min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-2">
                <FlameIcon className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div className="text-2xl font-bold">{completedWorkout.caloriesBurned}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center mb-2">
                <Dumbbell className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div className="text-2xl font-bold">{completedWorkout.exercises.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-success-100 dark:bg-success-900 flex items-center justify-center mb-2">
                <ClipboardCheck className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <div className="text-2xl font-bold">{totalReps}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Reps</div>
            </motion.div>
          </div>
        </div>
        
        {}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          
          <div className="space-y-4">
            {user && (
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-4 rounded-lg flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-4">
                  <FlameIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-medium">{user.streakCount} Day Streak!</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    You've worked out {user.streakCount} {user.streakCount === 1 ? 'day' : 'days'} in a row!
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gradient-to-r from-secondary-50 to-success-50 dark:from-secondary-900/20 dark:to-success-900/20 p-4 rounded-lg flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mr-4">
                <Trophy className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              </div>
              <div>
                <div className="font-medium">Workout Master</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Completed {user?.workoutHistory.length || 1} total workouts!
                </div>
              </div>
            </div>
            
            {totalSets >= 15 && (
              <div className="bg-gradient-to-r from-accent-50 to-success-50 dark:from-accent-900/20 dark:to-success-900/20 p-4 rounded-lg flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center mr-4">
                  <Dumbbell className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <div className="font-medium">Volume Champion</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completed {totalSets} sets in one workout!
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        {}
        {Object.keys(exerciseSummary).length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Muscle Focus</h2>
            <div className="space-y-2">
              {Object.entries(exerciseSummary)
                .sort(([, a], [, b]) => b - a)
                .map(([muscle, sets], index) => (
                  <div key={muscle} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm capitalize">{muscle}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-36 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-2">
                        <div 
                          className="h-full bg-primary-500 dark:bg-primary-600 rounded-full"
                          style={{ width: `${Math.min(100, (sets / totalSets) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{sets} sets</span>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
        
        {}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Recovery Recommendations</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Drink water to stay hydrated after your workout</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Consume protein within 30 minutes for optimal muscle recovery</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Stretch the muscles you worked today to reduce soreness</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Plan for at least 24-48 hours of rest before working the same muscle groups</span>
            </li>
          </ul>
        </motion.div>
        
        {}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button variant="primary" isFullWidth className="flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </Link>
          <Link to="/workout" className="flex-1">
            <Button variant="outline" isFullWidth className="flex items-center justify-center">
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Workout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}