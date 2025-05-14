import { AgeGroup, Difficulty } from './exercise';
import { CompletedWorkout, WorkoutPreferences } from './workout';

export interface UserStats {
  weight?: number;
  height?: number;
  bmi?: number;
  workoutsCompleted: number;
  streakDays: number;
  totalMinutesWorkedOut: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
}

export interface User {
  id: string;
  name: string;
  age?: number;
  ageGroup: AgeGroup;
  fitnessLevel: Difficulty;
  preferences: WorkoutPreferences;
  stats: UserStats;
  achievements: Achievement[];
  workoutHistory: CompletedWorkout[];
}