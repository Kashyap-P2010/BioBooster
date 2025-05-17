import { AgeGroup, DifficultyLevel, MuscleGroup } from './Exercise';
import { ExerciseSet } from './Exercise';
import { FitnessGoal } from './User';

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: ExerciseSet[];
  difficulty: DifficultyLevel;
  duration: number; 
  targetMuscleGroups: MuscleGroup[];
  targetAgeGroup: AgeGroup[];
  goals: FitnessGoal[];
  isFeatured?: boolean;
  isChallenge?: boolean;
  createdAt: Date;
  tags: string[];
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  userId: string;
  date: Date;
  exercises: CompletedExerciseSet[];
  duration: number; 
  feedback?: {
    energyLevel?: number; 
    difficulty?: number; 
    enjoyment?: number; 
    notes?: string;
  };
  completed: boolean;
}

export interface CompletedExerciseSet extends ExerciseSet {
  actualReps?: number;
  actualDuration?: number;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalExercises: number;
  totalMinutes: number;
  favoriteExercise?: {
    id: string;
    name: string;
    count: number;
  };
  mostWorkedMuscleGroup?: {
    group: MuscleGroup;
    count: number;
  };
  currentStreak: number;
  longestStreak: number;
  workoutsByWeekday: number[]; 
}

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  workout: Workout;
  date: Date;
  difficulty: DifficultyLevel;
  participants: number;
  rewards: {
    streakPoints: number;
    badges?: string[];
  };
}

export interface FriendWorkout {
  id: string;
  hostUserId: string;
  name: string;
  description: string;
  workout: Workout;
  scheduledDate?: Date;
  participants: string[]; 
  isLive: boolean;
  status: 'scheduled' | 'active' | 'completed';
  results?: {
    userId: string;
    completed: boolean;
    duration: number;
    date: Date;
  }[];
}