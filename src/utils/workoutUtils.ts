import { 
  WorkoutPreferences, 
  Workout, 
  WorkoutExercise 
} from '../types/workout';
import { exercises } from '../data/exercises';
import { Difficulty, MuscleGroup, Exercise } from '../types/exercise';


const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};


const getFilteredExercises = (preferences: WorkoutPreferences): Exercise[] => {
  let exercisePool: Exercise[] = [];
  
  
  const { difficulty } = preferences;
  exercisePool = exercises.filter(ex => ex.difficulty === difficulty);
  
  
  if (exercisePool.length < 5) {
    const difficultyLevels: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
    const currentLevelIndex = difficultyLevels.indexOf(difficulty);
    
    if (currentLevelIndex > 0) {
      
      const lowerLevelExercises = exercises.filter(
        ex => ex.difficulty === difficultyLevels[currentLevelIndex - 1]
      );
      exercisePool = [...exercisePool, ...lowerLevelExercises];
    }
  }
  
  
  if (!preferences.targetMuscleGroups.includes('full-body')) {
    exercisePool = exercisePool.filter(exercise => 
      exercise.muscleGroups.some(group => preferences.targetMuscleGroups.includes(group))
    );
  }
  
  
  if (exercisePool.length < 4) {
    const additionalExercises = exercises.filter(
      ex => !exercisePool.includes(ex) && 
      (preferences.targetMuscleGroups.includes('full-body') || 
       ex.muscleGroups.some(group => preferences.targetMuscleGroups.includes(group)))
    );
    
    exercisePool = [...exercisePool, ...additionalExercises];
  }
  
  return exercisePool;
};


export const generateWorkout = (preferences: WorkoutPreferences): Workout => {
  const { duration, difficulty, ageGroup, targetMuscleGroups } = preferences;
  
  
  const filteredExercises = getFilteredExercises(preferences);
  
  
  let exerciseCount: number;
  switch (duration) {
    case 5:
      exerciseCount = 4;
      break;
    case 10:
      exerciseCount = 6;
      break;
    case 20:
      exerciseCount = 8;
      break;
    case 30:
      exerciseCount = 10;
      break;
    case 45:
      exerciseCount = 12;
      break;
    default:
      exerciseCount = 8;
  }
  
  
  const selectedExercises: Exercise[] = [];
  const exercisePool = [...filteredExercises];
  
  
  exerciseCount = Math.min(exerciseCount, exercisePool.length);
  
  while (selectedExercises.length < exerciseCount && exercisePool.length > 0) {
    const randomIndex = Math.floor(Math.random() * exercisePool.length);
    selectedExercises.push(exercisePool[randomIndex]);
    exercisePool.splice(randomIndex, 1);
  }
  
  
  const workoutExercises: WorkoutExercise[] = selectedExercises.map(exercise => {
    let sets = 3;
    let reps = 10;
    let restTime = 30;
    
    
    if (difficulty === 'beginner') {
      sets = 2;
      reps = 8;
      restTime = 45;
    } else if (difficulty === 'advanced') {
      sets = 4;
      reps = 12;
      restTime = 20;
    }
    
    
    if (ageGroup === 'senior') {
      sets = Math.max(2, sets - 1);
      reps = Math.max(6, reps - 2);
      restTime += 15;
    } else if (ageGroup === 'teen') {
      
      if (difficulty === 'advanced') {
        sets = 3;
      }
    }
    
    return {
      exerciseId: exercise.id,
      sets,
      reps,
      durationInSeconds: exercise.durationInSeconds,
      restAfterInSeconds: restTime,
    };
  });
  
  
  const muscleGroupNames = targetMuscleGroups.map(group => 
    group.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  ).join('/');
  
  const intensityAdjective = difficulty === 'beginner' 
    ? 'Essential' 
    : difficulty === 'intermediate' 
      ? 'Effective' 
      : 'Intense';
  
  const workoutName = targetMuscleGroups.includes('full-body')
    ? `${intensityAdjective} ${duration}-Minute Full Body Workout`
    : `${intensityAdjective} ${duration}-Minute ${muscleGroupNames} Workout`;
  
  const difficultyName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  const ageGroupName = ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1);
  
  const workoutDescription = `A ${difficultyName}-level workout designed for ${ageGroupName}s, focusing on ${
    targetMuscleGroups.includes('full-body') ? 'full body training' : muscleGroupNames
  } for ${duration} minutes.`;
  
  return {
    id: generateId(),
    name: workoutName,
    description: workoutDescription,
    exercises: workoutExercises,
    duration,
    difficulty,
    targetMuscleGroups,
    createdAt: new Date().toISOString(),
  };
};