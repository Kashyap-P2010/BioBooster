export interface User {
  id: string;
  username: string;
  password: string; 
  age: number;
  createdAt: Date;
  lastLogin?: Date;
  streak: number;
  completedWorkouts: number;
  friends: string[]; 
  settings: UserSettings;
}

export interface UserSettings {
  fitnessLevel: FitnessLevel;
  fitnessGoals: FitnessGoal[];
  workoutReminders: boolean;
  workoutDays: number[]; 
  preferredWorkoutDuration: number; 
}

export enum FitnessLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced'
}

export enum FitnessGoal {
  BuildStrength = 'buildStrength',
  Endurance = 'endurance',
  LoseWeight = 'loseWeight',
  IncreaseFlexibility = 'increaseFlexibility',
  ImproveCardio = 'improveCardio'
}

export enum AgeGroup {
  Teen = 'teen', 
  Adult = 'adult', 
  Senior = 'senior' 
}

export const getAgeGroup = (age: number): AgeGroup => {
  if (age >= 13 && age <= 17) return AgeGroup.Teen;
  if (age >= 18 && age <= 45) return AgeGroup.Adult;
  return AgeGroup.Senior;
};

export const getDefaultSettingsForAge = (age: number): UserSettings => {
  const ageGroup = getAgeGroup(age);
  
  const defaultSettings: UserSettings = {
    fitnessLevel: FitnessLevel.Beginner,
    fitnessGoals: [FitnessGoal.BuildStrength],
    workoutReminders: true,
    workoutDays: [1, 3, 5], 
    preferredWorkoutDuration: 30, 
  };

  
  if (ageGroup === AgeGroup.Teen) {
    defaultSettings.fitnessGoals = [FitnessGoal.BuildStrength, FitnessGoal.ImproveCardio];
    defaultSettings.preferredWorkoutDuration = 25;
  } else if (ageGroup === AgeGroup.Adult) {
    defaultSettings.fitnessGoals = [FitnessGoal.BuildStrength, FitnessGoal.LoseWeight];
    defaultSettings.preferredWorkoutDuration = 35;
  } else if (ageGroup === AgeGroup.Senior) {
    defaultSettings.fitnessGoals = [FitnessGoal.IncreaseFlexibility, FitnessGoal.ImproveCardio];
    defaultSettings.preferredWorkoutDuration = 20;
  }

  return defaultSettings;
};