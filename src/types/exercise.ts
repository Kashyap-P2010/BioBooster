export type MuscleGroup = 'full-body' | 'abs' | 'legs' | 'arms' | 'chest' | 'back' | 'shoulders';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type AgeGroup = 'teen' | 'adult' | 'senior';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  difficulty: Difficulty;
  durationInSeconds: number;
  imageUrl: string;
  instructions: string[];
  modifications?: {
    easier?: string;
    harder?: string;
  };
}