
export interface Exercise {
  id: string;
  name: string;
  category: 'upper-body' | 'core' | 'lower-body' | 'full-body' | 'mobility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string;
  targetMuscles: string[];
  imageUrl: string;
}


export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restSeconds: number;
  completed: boolean;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  createdAt: string;
  forDay?: string; 
  category?: 'teen' | 'adult' | 'senior' | 'custom';
}

export interface ActiveWorkout extends Workout {
  currentExerciseIndex: number;
  currentSetIndex: number;
  isResting: boolean;
  timeRemaining: number;
}


export interface WorkoutHistory {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  duration: number;
  caloriesBurned: number;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
  }[];
}

export interface UserProfile {
  name: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal?: string;
  streakCount: number;
  workoutHistory: WorkoutHistory[];
  workoutDays: string[]; 
}