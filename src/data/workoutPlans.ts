import { Workout } from '../types';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const defaultWorkoutPlans: Workout[] = [
  {
    id: generateId(),
    name: 'Teen Beginner Full Body',
    description: 'A balanced full-body workout ideal for teens new to fitness.',
    category: 'teen',
    exercises: [
      { exerciseId: 'jumping-jacks', sets: 3, reps: 20, restSeconds: 30, completed: false },
      { exerciseId: 'pushups-regular', sets: 3, reps: 8, restSeconds: 60, completed: false },
      { exerciseId: 'squats', sets: 3, reps: 15, restSeconds: 60, completed: false },
      { exerciseId: 'planks', sets: 3, reps: 1, restSeconds: 45, completed: false },
      { exerciseId: 'high-knees', sets: 3, reps: 20, restSeconds: 30, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Monday'
  },
  {
    id: generateId(),
    name: 'Teen Upper Body Focus',
    description: 'Build upper body strength with these body weight exercises.',
    category: 'teen',
    exercises: [
      { exerciseId: 'incline-pushups', sets: 3, reps: 12, restSeconds: 45, completed: false },
      { exerciseId: 'triceps-dips', sets: 3, reps: 10, restSeconds: 60, completed: false },
      { exerciseId: 'plank-shoulder-taps', sets: 3, reps: 16, restSeconds: 45, completed: false },
      { exerciseId: 'arm-circles', sets: 3, reps: 15, restSeconds: 30, completed: false },
      { exerciseId: 'crab-walks', sets: 3, reps: 10, restSeconds: 45, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Wednesday'
  },
  {
    id: generateId(),
    name: 'Teen Core Strengthener',
    description: 'Focus on developing core strength and stability.',
    category: 'teen',
    exercises: [
      { exerciseId: 'planks', sets: 3, reps: 1, restSeconds: 45, completed: false },
      { exerciseId: 'bicycle-crunches', sets: 3, reps: 20, restSeconds: 30, completed: false },
      { exerciseId: 'toe-touches', sets: 3, reps: 15, restSeconds: 30, completed: false },
      { exerciseId: 'russian-twists', sets: 3, reps: 20, restSeconds: 45, completed: false },
      { exerciseId: 'superman-holds', sets: 3, reps: 12, restSeconds: 30, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Friday'
  },
  
  {
    id: generateId(),
    name: 'Adult Full Body Circuit',
    description: 'A comprehensive circuit to challenge your entire body.',
    category: 'adult',
    exercises: [
      { exerciseId: 'burpees', sets: 4, reps: 10, restSeconds: 45, completed: false },
      { exerciseId: 'pushups-regular', sets: 4, reps: 15, restSeconds: 60, completed: false },
      { exerciseId: 'jump-squats', sets: 4, reps: 15, restSeconds: 60, completed: false },
      { exerciseId: 'mountain-climbers', sets: 4, reps: 30, restSeconds: 45, completed: false },
      { exerciseId: 'russian-twists', sets: 4, reps: 30, restSeconds: 45, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Monday'
  },
  {
    id: generateId(),
    name: 'Adult Upper Power',
    description: 'Build upper body strength and definition.',
    category: 'adult',
    exercises: [
      { exerciseId: 'diamond-pushups', sets: 4, reps: 12, restSeconds: 60, completed: false },
      { exerciseId: 'wide-pushups', sets: 4, reps: 12, restSeconds: 60, completed: false },
      { exerciseId: 'pike-pushups', sets: 4, reps: 10, restSeconds: 60, completed: false },
      { exerciseId: 'triceps-dips', sets: 4, reps: 15, restSeconds: 45, completed: false },
      { exerciseId: 'plank-jacks', sets: 4, reps: 15, restSeconds: 45, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Wednesday'
  },
  {
    id: generateId(),
    name: 'Adult Lower Body Blast',
    description: 'Focus on lower body strength and power.',
    category: 'adult',
    exercises: [
      { exerciseId: 'jump-squats', sets: 4, reps: 15, restSeconds: 60, completed: false },
      { exerciseId: 'lunges', sets: 4, reps: 12, restSeconds: 45, completed: false },
      { exerciseId: 'bulgarian-split-squats', sets: 3, reps: 10, restSeconds: 60, completed: false },
      { exerciseId: 'glute-bridges', sets: 4, reps: 20, restSeconds: 45, completed: false },
      { exerciseId: 'wall-sit', sets: 3, reps: 1, restSeconds: 60, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Friday'
  },
  
  {
    id: generateId(),
    name: 'Senior Mobility & Strength',
    description: 'A gentle workout focusing on maintaining mobility and basic strength.',
    category: 'senior',
    exercises: [
      { exerciseId: 'chair-squats', sets: 2, reps: 10, restSeconds: 60, completed: false },
      { exerciseId: 'incline-pushups', sets: 2, reps: 8, restSeconds: 60, completed: false },
      { exerciseId: 'seated-forward-fold', sets: 2, reps: 1, restSeconds: 30, completed: false },
      { exerciseId: 'hip-circles', sets: 2, reps: 10, restSeconds: 30, completed: false },
      { exerciseId: 'cat-cow', sets: 2, reps: 10, restSeconds: 30, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Monday'
  },
  {
    id: generateId(),
    name: 'Senior Balance & Core',
    description: 'Improve balance and core strength with these gentle exercises.',
    category: 'senior',
    exercises: [
      { exerciseId: 'planks', sets: 2, reps: 1, restSeconds: 60, completed: false },
      { exerciseId: 'childs-pose', sets: 2, reps: 1, restSeconds: 30, completed: false },
      { exerciseId: 'side-plank', sets: 2, reps: 1, restSeconds: 60, completed: false },
      { exerciseId: 'leg-swings', sets: 2, reps: 10, restSeconds: 30, completed: false },
      { exerciseId: 'toe-touches', sets: 2, reps: 8, restSeconds: 30, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Wednesday'
  },
  {
    id: generateId(),
    name: 'Senior Joint Mobility',
    description: 'Focus on maintaining range of motion in all major joints.',
    category: 'senior',
    exercises: [
      { exerciseId: 'arm-circles', sets: 2, reps: 10, restSeconds: 30, completed: false },
      { exerciseId: 'cat-cow', sets: 2, reps: 8, restSeconds: 30, completed: false },
      { exerciseId: 'hip-circles', sets: 2, reps: 10, restSeconds: 30, completed: false },
      { exerciseId: 'ankle-bounces', sets: 2, reps: 15, restSeconds: 30, completed: false },
      { exerciseId: 'thread-the-needle', sets: 2, reps: 6, restSeconds: 30, completed: false }
    ],
    createdAt: new Date().toISOString(),
    forDay: 'Friday'
  }
];

export const getWorkoutsByCategory = (category: 'teen' | 'adult' | 'senior') => {
  return defaultWorkoutPlans.filter(workout => workout.category === category);
};