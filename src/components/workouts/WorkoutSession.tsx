import { useState, useEffect } from 'react';
import { Workout } from '../../types/workout';
import { getExerciseById } from '../../data/exercises';
import WorkoutTimer from './WorkoutTimer';
import Button from '../common/Button';
import Card from '../common/Card';
import { useTheme } from '../../context/ThemeContext';
import { Play, Pause, SkipForward, CheckCircle } from 'lucide-react';

interface WorkoutSessionProps {
  workout: Workout;
  onComplete: () => void;
  onExit: () => void;
}

const WorkoutSession = ({ workout, onComplete, onExit }: WorkoutSessionProps) => {
  const { theme } = useTheme();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  const currentExercise = workout.exercises[currentExerciseIndex];
  const exercise = getExerciseById(currentExercise.exerciseId);
  
  const handleNextSet = () => {
    if (currentSet < currentExercise.sets) {
      setCurrentSet(prev => prev + 1);
      setIsResting(true);
    } else {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setIsResting(true);
      } else {
        setSessionComplete(true);
      }
    }
  };
  
  if (!exercise) return null;
  
  if (sessionComplete) {
    return (
      <Card className="p-6 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Workout Complete!</h2>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Great job! You've completed the {workout.name} workout.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onExit}>
            Exit
          </Button>
          <Button variant="primary" onClick={onComplete}>
            Save Progress
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
    
      <div className="relative h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div 
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
          style={{ 
            width: `${((currentExerciseIndex * currentExercise.sets + (currentSet - 1)) / 
              (workout.exercises.length * currentExercise.sets)) * 100}%` 
          }}
        ></div>
      </div>
      
  
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{exercise.name}</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500">Exercise {currentExerciseIndex + 1} of {workout.exercises.length}</p>
            <p className="text-sm text-gray-500">Set {currentSet} of {currentExercise.sets}</p>
          </div>
        </div>
        
        <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
          <img 
            src={`https://images.pexels.com/photos/4162456/pexels-photo-4162456.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
        
    
        <WorkoutTimer 
          exerciseDuration={currentExercise.durationInSeconds}
          restDuration={currentExercise.restAfterInSeconds}
          onComplete={handleNextSet}
        />
      </Card>
      
 
      <div className="flex justify-between">
        <Button variant="outline" onClick={onExit}>
          Exit Workout
        </Button>
        <Button variant="primary" onClick={handleNextSet}>
          Skip <SkipForward className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WorkoutSession;