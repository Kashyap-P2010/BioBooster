import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

interface WorkoutTimerProps {
  exerciseDuration: number;
  restDuration: number;
  onComplete?: () => void;
}

const WorkoutTimer = ({ exerciseDuration, restDuration, onComplete }: WorkoutTimerProps) => {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState(exerciseDuration);
  const [isResting, setIsResting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const reset = useCallback(() => {
    setTimeLeft(exerciseDuration);
    setIsResting(false);
    setIsRunning(false);
  }, [exerciseDuration]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const skipInterval = () => {
    if (isResting) {
      setIsResting(false);
      setTimeLeft(exerciseDuration);
    } else {
      setIsResting(true);
      setTimeLeft(restDuration);
    }
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isResting) {
        setIsResting(false);
        setTimeLeft(exerciseDuration);
      } else {
        setIsResting(true);
        setTimeLeft(restDuration);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isResting, exerciseDuration, restDuration]);
  
  const progressPercentage = (timeLeft / (isResting ? restDuration : exerciseDuration)) * 100;
  
  return (
    <div className={`
      p-6 rounded-lg shadow-lg
      ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
    `}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">
          {isResting ? 'Rest Time' : 'Exercise Time'}
        </h3>
        <div className="text-4xl font-mono font-bold mb-4">
          {formatTime(timeLeft)}
        </div>
        <div className="relative h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
          <div 
            className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
              isResting ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={reset}
          className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          variant="primary"
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        >
          {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="outline"
          onClick={skipInterval}
          className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default WorkoutTimer;