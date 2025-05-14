import { AgeGroup, Difficulty, MuscleGroup } from './exercise';

export type WorkoutDuration = 5 | 10 | 20 | 30 | 45;

export interface WorkoutPreferences {
  duration: WorkoutDuration;
  difficulty: Difficulty;
  ageGroup: AgeGroup;
  targetMuscleGroups: MuscleGroup[];
  includedExerciseIds?: string[];
  excludedExerciseIds?: string[];
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  durationInSeconds?: number;
  restAfterInSeconds: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  duration: number;
  difficulty: Difficulty;
  targetMuscleGroups: MuscleGroup[];
  createdAt: string;
  type: 'preset' | 'generated';
  imageUrl?: string;
}

export interface CompletedWorkout {
  workoutId: string;
  completedAt: string;
  durationInMinutes: number;
  caloriesBurned?: number;
  rating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}