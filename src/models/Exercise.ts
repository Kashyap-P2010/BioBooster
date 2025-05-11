export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  difficulty: DifficultyLevel;
  imageUrl?: string;
  videoUrl?: string;
  instructions: string[];
  duration?: number; // in seconds, for timed exercises like planks
  recommended?: {
    reps?: { min: number; max: number };
    sets?: { min: number; max: number };
    restBetweenSets?: number; // in seconds
  };
  equipment: Equipment[];
  ageGroups: AgeGroup[];
  tips: string[];
  variations: ExerciseVariation[];
}

export enum MuscleGroup {
  Chest = 'chest',
  Back = 'back',
  Shoulders = 'shoulders',
  Arms = 'arms',
  Core = 'core',
  Legs = 'legs',
  Glutes = 'glutes',
  FullBody = 'fullBody',
  Cardio = 'cardio'
}

export enum DifficultyLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced'
}

export enum Equipment {
  None = 'none',
  Chair = 'chair',
  Wall = 'wall'
}

export enum AgeGroup {
  Teen = 'teen', // 13-17
  Adult = 'adult', // 18-45
  Senior = 'senior' // 46+
}

export interface ExerciseVariation {
  name: string;
  description: string;
  difficulty: DifficultyLevel;
}

export interface ExerciseSet {
  exerciseId: string;
  sets: number;
  reps: number;
  duration?: number; // For timed exercises
  completed: boolean;
  notes?: string;
}