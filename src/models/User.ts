export interface User {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  age: number;
  createdAt: Date;
  lastLogin?: Date;
  streak: number;
  completedWorkouts: number;
  friends: string[]; // Array of user IDs
  settings: UserSettings;
}

export interface UserSettings {
  fitnessLevel: FitnessLevel;
  fitnessGoals: FitnessGoal[];
  workoutReminders: boolean;
  workoutDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  preferredWorkoutDuration: number; // in minutes
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
  Teen = 'teen', // 13-17
  Adult = 'adult', // 18-45
  Senior = 'senior' // 46+
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
    workoutDays: [1, 3, 5], // Monday, Wednesday, Friday
    preferredWorkoutDuration: 30, // 30 minutes
  };

  // Customize based on age group
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