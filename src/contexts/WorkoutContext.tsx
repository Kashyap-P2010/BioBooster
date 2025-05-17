import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ActiveWorkout, Workout } from '../types';

interface WorkoutContextType {
  savedWorkouts: Workout[];
  activeWorkout: ActiveWorkout | null;
  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  startWorkout: (workout: Workout) => void;
  updateActiveWorkout: (workout: ActiveWorkout) => void;
  completeWorkout: () => ActiveWorkout | null;
  resetActiveWorkout: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('biobooster-workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(() => {
    const active = localStorage.getItem('biobooster-active-workout');
    return active ? JSON.parse(active) : null;
  });

  useEffect(() => {
    localStorage.setItem('biobooster-workouts', JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

  useEffect(() => {
    if (activeWorkout) {
      localStorage.setItem('biobooster-active-workout', JSON.stringify(activeWorkout));
    } else {
      localStorage.removeItem('biobooster-active-workout');
    }
  }, [activeWorkout]);

  const addWorkout = (workout: Workout) => {
    setSavedWorkouts([...savedWorkouts, workout]);
  };

  const updateWorkout = (workout: Workout) => {
    setSavedWorkouts(
      savedWorkouts.map((w) => (w.id === workout.id ? workout : w))
    );
  };

  const deleteWorkout = (id: string) => {
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
  };

  const startWorkout = (workout: Workout) => {
    const newActiveWorkout: ActiveWorkout = {
      ...workout,
      exercises: workout.exercises.map(ex => ({...ex, completed: false})),
      currentExerciseIndex: 0,
      currentSetIndex: 0,
      isResting: false,
      timeRemaining: 0,
    };
    setActiveWorkout(newActiveWorkout);
  };

  const updateActiveWorkout = (workout: ActiveWorkout) => {
    setActiveWorkout(workout);
  };

  const completeWorkout = () => {
    const completed = activeWorkout;
    setActiveWorkout(null);
    return completed;
  };

  const resetActiveWorkout = () => {
    setActiveWorkout(null);
  };

  return (
    <WorkoutContext.Provider
      value={{
        savedWorkouts,
        activeWorkout,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        startWorkout,
        updateActiveWorkout,
        completeWorkout,
        resetActiveWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}