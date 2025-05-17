import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, ChevronRight, Dumbbell, Pause, Play, RotateCcw, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import WorkoutTimer from '../components/workout/WorkoutTimer';
import { useWorkout } from '../contexts/WorkoutContext';
import { getExerciseById } from '../data/exercises';

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const { activeWorkout, updateActiveWorkout, resetActiveWorkout } = useWorkout();
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    if (!activeWorkout) {
      navigate('/workout');
      return;
    }
  }, [activeWorkout, navigate]);
  
  if (!activeWorkout) return null;
  
  const currentExercise = activeWorkout.exercises[activeWorkout.currentExerciseIndex];
  const exerciseDetails = getExerciseById(currentExercise.exerciseId);
  
  const handleSkip = () => {
    if (!exerciseDetails) return;
    
    const newWorkout = { ...activeWorkout };
    
    if (activeWorkout.isResting) {
      
      newWorkout.isResting = false;
      newWorkout.timeRemaining = 0;
    } else {
      
      if (activeWorkout.currentSetIndex < currentExercise.sets - 1) {
        
        newWorkout.currentSetIndex += 1;
        newWorkout.isResting = true;
        newWorkout.timeRemaining = currentExercise.restSeconds;
      } else {
        
        if (activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
          newWorkout.currentExerciseIndex += 1;
          newWorkout.currentSetIndex = 0;
          newWorkout.isResting = false;
          newWorkout.timeRemaining = 0;
        } else {
          
          navigate('/workout/complete');
          return;
        }
      }
    }
    
    updateActiveWorkout(newWorkout);
  };
  
  const handleComplete = () => {
    if (!exerciseDetails) return;
    
    const newWorkout = { ...activeWorkout };
    
    if (activeWorkout.isResting) {
      
      newWorkout.isResting = false;
      newWorkout.timeRemaining = 0;
    } else {
      
      if (activeWorkout.currentSetIndex < currentExercise.sets - 1) {
        
        newWorkout.currentSetIndex += 1;
        newWorkout.isResting = true;
        newWorkout.timeRemaining = currentExercise.restSeconds;
      } else {
        
        newWorkout.exercises[activeWorkout.currentExerciseIndex].completed = true;
        
        if (activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
          newWorkout.currentExerciseIndex += 1;
          newWorkout.currentSetIndex = 0;
          newWorkout.isResting = false;
          newWorkout.timeRemaining = 0;
        } else {
          
          navigate('/workout/complete');
          return;
        }
      }
    }
    
    updateActiveWorkout(newWorkout);
  };
  
  const handleQuit = () => {
    if (confirm('Are you sure you want to quit this workout? Your progress will be lost.')) {
      resetActiveWorkout();
      navigate('/workout');
    }
  };
  
  const progress = ((activeWorkout.currentExerciseIndex * currentExercise.sets + activeWorkout.currentSetIndex + 1) / 
    (activeWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0))) * 100;
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        {}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleQuit}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-center">{activeWorkout.name}</h1>
          <div className="w-6" /> {}
        </div>
        
        {}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-500 dark:bg-primary-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          {exerciseDetails && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{exerciseDetails.name}</h2>
                <span className="text-sm font-medium px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full">
                  Set {activeWorkout.currentSetIndex + 1} of {currentExercise.sets}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {exerciseDetails.instructions}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Reps</div>
                  <div className="text-2xl font-bold">{currentExercise.reps}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Rest</div>
                  <div className="text-2xl font-bold">{currentExercise.restSeconds}s</div>
                </div>
              </div>
              
              {activeWorkout.isResting ? (
                <div className="text-center mb-4">
                  <div className="text-xl font-semibold mb-2">Rest Time</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Take a breather before the next set
                  </p>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <div className="text-xl font-semibold mb-2">Work Time</div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Complete {currentExercise.reps} reps with good form
                  </p>
                </div>
              )}
              
              <WorkoutTimer
                durationSeconds={activeWorkout.isResting ? currentExercise.restSeconds : 0}
                isActive={!isPaused}
                isRest={activeWorkout.isResting}
                onComplete={handleComplete}
                onSkip={handleSkip}
                onTogglePause={() => setIsPaused(!isPaused)}
              />
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleComplete}
                  className="flex-1"
                >
                  {activeWorkout.isResting ? (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Next Set
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Set
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </motion.div>
        
        {}
        {activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          >
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Next Exercise
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <Dumbbell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <div className="font-medium">
                    {getExerciseById(activeWorkout.exercises[activeWorkout.currentExerciseIndex + 1].exerciseId)?.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {activeWorkout.exercises[activeWorkout.currentExerciseIndex + 1].sets} sets × {activeWorkout.exercises[activeWorkout.currentExerciseIndex + 1].reps} reps
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}