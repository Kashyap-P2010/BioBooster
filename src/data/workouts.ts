import { Workout, DailyChallenge } from '../models/Workout';
import { DifficultyLevel, MuscleGroup, AgeGroup } from '../models/Exercise';
import { FitnessGoal } from '../models/User';
import { exercises } from './exercises';
import { v4 as uuidv4 } from 'uuid';

// Helper function to find exercise by name
const findExerciseByName = (name: string) => {
  return exercises.find(exercise => exercise.name === name);
};

// Create workouts using exercises from our database
export const workouts: Workout[] = [
  {
    id: uuidv4(),
    name: 'Full Body Beginner Blast',
    description: 'A well-rounded workout for beginners targeting all major muscle groups.',
    exercises: [
      {
        exerciseId: findExerciseByName('Bodyweight Squat')?.id || '',
        sets: 3,
        reps: 12,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Push-Up')?.id || '',
        sets: 2,
        reps: 8,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Plank')?.id || '',
        sets: 2,
        duration: 30,
        reps: 0, // Not applicable for timed exercises
        completed: false
      },
      {
        exerciseId: findExerciseByName('Glute Bridge')?.id || '',
        sets: 3,
        reps: 12,
        completed: false
      }
    ],
    difficulty: DifficultyLevel.Beginner,
    duration: 20, // 20 minutes
    targetMuscleGroups: [
      MuscleGroup.Legs, 
      MuscleGroup.Chest, 
      MuscleGroup.Core, 
      MuscleGroup.Glutes
    ],
    targetAgeGroup: [AgeGroup.Teen, AgeGroup.Adult],
    goals: [
      FitnessGoal.BuildStrength, 
      FitnessGoal.LoseWeight
    ],
    isFeatured: true,
    createdAt: new Date(),
    tags: ['beginner', 'full-body', 'quick']
  },
  {
    id: uuidv4(),
    name: 'Core Crusher',
    description: 'Focus on strengthening your core with this intense abdominal workout.',
    exercises: [
      {
        exerciseId: findExerciseByName('Plank')?.id || '',
        sets: 3,
        duration: 45,
        reps: 0,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Mountain Climbers')?.id || '',
        sets: 3,
        duration: 30,
        reps: 0,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Bird Dog')?.id || '',
        sets: 3,
        reps: 10,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Glute Bridge')?.id || '',
        sets: 3,
        reps: 15,
        completed: false
      }
    ],
    difficulty: DifficultyLevel.Intermediate,
    duration: 25, // 25 minutes
    targetMuscleGroups: [MuscleGroup.Core, MuscleGroup.Glutes],
    targetAgeGroup: [AgeGroup.Teen, AgeGroup.Adult],
    goals: [FitnessGoal.BuildStrength, FitnessGoal.LoseWeight],
    isFeatured: false,
    createdAt: new Date(),
    tags: ['core', 'abs', 'intermediate']
  },
  {
    id: uuidv4(),
    name: 'Lower Body Burner',
    description: 'Target your legs and glutes with this challenging lower body workout.',
    exercises: [
      {
        exerciseId: findExerciseByName('Bodyweight Squat')?.id || '',
        sets: 4,
        reps: 15,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Lunges')?.id || '',
        sets: 3,
        reps: 12,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Glute Bridge')?.id || '',
        sets: 3,
        reps: 15,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Wall Sit')?.id || '',
        sets: 3,
        duration: 45,
        reps: 0,
        completed: false
      }
    ],
    difficulty: DifficultyLevel.Intermediate,
    duration: 30, // 30 minutes
    targetMuscleGroups: [MuscleGroup.Legs, MuscleGroup.Glutes],
    targetAgeGroup: [AgeGroup.Teen, AgeGroup.Adult],
    goals: [FitnessGoal.BuildStrength, FitnessGoal.Endurance],
    isFeatured: true,
    createdAt: new Date(),
    tags: ['legs', 'glutes', 'strength']
  },
  {
    id: uuidv4(),
    name: 'Senior Mobility & Strength',
    description: 'A gentle workout designed for seniors to improve mobility, balance, and strength.',
    exercises: [
      {
        exerciseId: findExerciseByName('Seated Leg Lifts')?.id || '',
        sets: 2,
        reps: 10,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Bird Dog')?.id || '',
        sets: 2,
        reps: 8,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Glute Bridge')?.id || '',
        sets: 2,
        reps: 10,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Wall Sit')?.id || '',
        sets: 2,
        duration: 20,
        reps: 0,
        completed: false
      }
    ],
    difficulty: DifficultyLevel.Beginner,
    duration: 20, // 20 minutes
    targetMuscleGroups: [MuscleGroup.Legs, MuscleGroup.Core, MuscleGroup.Glutes],
    targetAgeGroup: [AgeGroup.Senior],
    goals: [FitnessGoal.IncreaseFlexibility, FitnessGoal.BuildStrength],
    isFeatured: true,
    createdAt: new Date(),
    tags: ['senior', 'mobility', 'gentle']
  },
  {
    id: uuidv4(),
    name: 'Teen Energy Blast',
    description: 'A high-energy workout for teens focusing on form, coordination, and burning energy.',
    exercises: [
      {
        exerciseId: findExerciseByName('Push-Up')?.id || '',
        sets: 3,
        reps: 10,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Bodyweight Squat')?.id || '',
        sets: 3,
        reps: 15,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Mountain Climbers')?.id || '',
        sets: 3,
        duration: 30,
        reps: 0,
        completed: false
      },
      {
        exerciseId: findExerciseByName('Plank')?.id || '',
        sets: 3,
        duration: 30,
        reps: 0,
        completed: false
      }
    ],
    difficulty: DifficultyLevel.Beginner,
    duration: 25, // 25 minutes
    targetMuscleGroups: [MuscleGroup.FullBody, MuscleGroup.Cardio],
    targetAgeGroup: [AgeGroup.Teen],
    goals: [FitnessGoal.ImproveCardio, FitnessGoal.BuildStrength],
    isFeatured: false,
    createdAt: new Date(),
    tags: ['teen', 'energy', 'cardio']
  }
];

// Create daily challenges
export const dailyChallenges: DailyChallenge[] = [
  {
    id: uuidv4(),
    name: 'Full Body Blitz Challenge',
    description: 'Push your limits with this full-body workout designed to boost strength and endurance.',
    workout: {
      id: uuidv4(),
      name: 'Full Body Blitz',
      description: 'A challenging full-body workout targeting all major muscle groups.',
      exercises: [
        {
          exerciseId: findExerciseByName('Push-Up')?.id || '',
          sets: 3,
          reps: 15,
          completed: false
        },
        {
          exerciseId: findExerciseByName('Bodyweight Squat')?.id || '',
          sets: 3,
          reps: 20,
          completed: false
        },
        {
          exerciseId: findExerciseByName('Plank')?.id || '',
          sets: 3,
          duration: 45,
          reps: 0,
          completed: false
        },
        {
          exerciseId: findExerciseByName('Lunges')?.id || '',
          sets: 3,
          reps: 12,
          completed: false,
          notes: 'Each leg'
        },
        {
          exerciseId: findExerciseByName('Mountain Climbers')?.id || '',
          sets: 3,
          duration: 45,
          reps: 0,
          completed: false
        }
      ],
      difficulty: DifficultyLevel.Intermediate,
      duration: 35, // 35 minutes
      targetMuscleGroups: [MuscleGroup.FullBody],
      targetAgeGroup: [AgeGroup.Teen, AgeGroup.Adult],
      goals: [FitnessGoal.BuildStrength, FitnessGoal.Endurance, FitnessGoal.LoseWeight],
      isChallenge: true,
      createdAt: new Date(),
      tags: ['challenge', 'full-body', 'intermediate']
    },
    date: new Date(),
    difficulty: DifficultyLevel.Intermediate,
    participants: 234,
    rewards: {
      streakPoints: 50,
      badges: ['Daily Challenger', 'Full Body Warrior']
    }
  },
  {
    id: uuidv4(),
    name: '5-Minute Core Crusher',
    description: 'A quick but intense core workout that you can do anytime, anywhere.',
    workout: {
      id: uuidv4(),
      name: '5-Minute Core Crusher',
      description: 'An intense core workout that takes just 5 minutes.',
      exercises: [
        {
          exerciseId: findExerciseByName('Plank')?.id || '',
          sets: 1,
          duration: 60,
          reps: 0,
          completed: false
        },
        {
          exerciseId: findExerciseByName('Mountain Climbers')?.id || '',
          sets: 1,
          duration: 60,
          reps: 0,
          completed: false
        },
        {
          exerciseId: findExerciseByName('Bird Dog')?.id || '',
          sets: 1,
          reps: 20,
          completed: false,
          notes: '10 each side'
        },
        {
          exerciseId: findExerciseByName('Glute Bridge')?.id || '',
          sets: 1,
          reps: 20,
          completed: false
        }
      ],
      difficulty: DifficultyLevel.Beginner,
      duration: 5, // 5 minutes
      targetMuscleGroups: [MuscleGroup.Core, MuscleGroup.Glutes],
      targetAgeGroup: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
      goals: [FitnessGoal.BuildStrength],
      isChallenge: true,
      createdAt: new Date(),
      tags: ['challenge', 'quick', 'core']
    },
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday's challenge
    difficulty: DifficultyLevel.Beginner,
    participants: 456,
    rewards: {
      streakPoints: 25,
      badges: ['Core Crusher']
    }
  }
];