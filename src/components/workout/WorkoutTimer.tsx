import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, SkipForward } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';

interface WorkoutTimerProps {
  durationSeconds: number;
  isActive: boolean;
  isRest: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onTogglePause: () => void;
}

export default function WorkoutTimer({
  durationSeconds,
  isActive,
  isRest,
  onComplete,
  onSkip,
  onTogglePause
}: WorkoutTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeRemaining(durationSeconds);
  }, [durationSeconds]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(interval);
            onComplete();
          }
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeRemaining, onComplete]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeRemaining / durationSeconds) * 100;

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    onTogglePause();
  };

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div className="relative h-36 w-36 mx-auto">
        
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={isRest ? "#6366f1" : "#10b981"}
            strokeWidth="8"
            fill="none"
            opacity="0.2"
          />
        
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke={isRest ? "#6366f1" : "#10b981"}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * progress) / 100}
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * progress) / 100 }}
            transition={{ duration: 0.5 }}
          />
        </svg>

       
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={timeRemaining}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-3xl font-bold"
            >
              {formatTime(timeRemaining)}
            </motion.div>
          </AnimatePresence>
          <div className="text-sm mt-1 font-medium">
            {isRest ? "Rest" : "Work"}
          </div>
        </div>
      </div>

    
      <div className="flex justify-center space-x-4 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleTogglePause}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play size={18} /> : <Pause size={18} />}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onSkip}
          aria-label="Skip"
        >
          <SkipForward size={18} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTimeRemaining(durationSeconds)}
          aria-label="Reset"
        >
          <RefreshCw size={18} />
        </Button>
      </div>
    </div>
  );
}