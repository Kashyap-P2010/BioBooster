export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  difficulty: DifficultyLevel;
  imageUrl?: string;
  videoUrl?: string;
  instructions: string[];
  duration?: number; 
  recommended?: {
    reps?: { min: number; max: number };
    sets?: { min: number; max: number };
    restBetweenSets?: number;
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
  Teen = 'teen',
  Adult = 'adult', 
  Senior = 'senior' 
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
  duration?: number; 
  completed: boolean;
  notes?: string;
}