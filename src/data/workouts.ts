import { Workout } from '../types/workout';

export const presetWorkouts: Workout[] = [
  {
    id: 'morning-energizer',
    name: 'Morning Energizer',
    description: 'Start your day with this invigorating full-body workout that will boost your energy levels.',
    type: 'preset',
    difficulty: 'beginner',
    duration: 20,
    targetMuscleGroups: ['full-body'],
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'jumping-jacks',
        sets: 3,
        reps: 20,
        durationInSeconds: 60,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'arm-circles',
        sets: 2,
        reps: 15,
        durationInSeconds: 45,
        restAfterInSeconds: 20
      },
      {
        exerciseId: 'high-knees-slow',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 15,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: 'core-crusher',
    name: 'Core Crusher',
    description: 'An intense core workout focusing on building strength and definition in your midsection.',
    type: 'preset',
    difficulty: 'intermediate',
    duration: 30,
    targetMuscleGroups: ['abs'],
    imageUrl: 'https://images.pexels.com/photos/4162456/pexels-photo-4162456.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'plank',
        sets: 3,
        reps: 1,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'bicycle-crunches',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'russian-twists',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'hollow-body-hold',
        sets: 3,
        reps: 1,
        durationInSeconds: 45,
        restAfterInSeconds: 45
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: 'power-push',
    name: 'Power Push',
    description: 'Challenge yourself with this advanced upper body workout focusing on push exercises.',
    type: 'preset',
    difficulty: 'advanced',
    duration: 45,
    targetMuscleGroups: ['chest', 'shoulders', 'arms'],
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'diamond-pushups',
        sets: 4,
        reps: 12,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'pike-pushups',
        sets: 3,
        reps: 10,
        durationInSeconds: 45,
        restAfterInSeconds: 60
      },
      {
        exerciseId: 'decline-pushups',
        sets: 3,
        reps: 15,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'plank-to-pushup',
        sets: 3,
        reps: 10,
        durationInSeconds: 45,
        restAfterInSeconds: 60
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: 'leg-day-blast',
    name: 'Leg Day Blast',
    description: 'A challenging lower body workout to build strength and endurance in your legs.',
    type: 'preset',
    difficulty: 'intermediate',
    duration: 35,
    targetMuscleGroups: ['legs'],
    imageUrl: 'https://images.pexels.com/photos/4162456/pexels-photo-4162456.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'squats',
        sets: 4,
        reps: 15,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'reverse-lunges',
        sets: 3,
        reps: 12,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'glute-bridges',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'wall-sit',
        sets: 3,
        reps: 1,
        durationInSeconds: 60,
        restAfterInSeconds: 45
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: 'senior-mobility',
    name: 'Senior Mobility & Strength',
    description: 'A gentle but effective workout designed specifically for seniors to improve mobility and maintain strength.',
    type: 'preset',
    difficulty: 'beginner',
    duration: 25,
    targetMuscleGroups: ['full-body'],
    imageUrl: 'https://images.pexels.com/photos/7991524/pexels-photo-7991524.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'arm-circles',
        sets: 2,
        reps: 10,
        durationInSeconds: 30,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'wall-sit',
        sets: 2,
        reps: 1,
        durationInSeconds: 30,
        restAfterInSeconds: 60
      },
      {
        exerciseId: 'standing-calf-raises',
        sets: 2,
        reps: 12,
        durationInSeconds: 30,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'marching-in-place',
        sets: 2,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 60
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: 'teen-fitness',
    name: 'Teen Fitness Fundamentals',
    description: 'A fun and engaging workout designed for teenagers to build strength and improve coordination.',
    type: 'preset',
    difficulty: 'beginner',
    duration: 30,
    targetMuscleGroups: ['full-body'],
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&fit=crop',
    exercises: [
      {
        exerciseId: 'jumping-jacks',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'knee-pushups',
        sets: 3,
        reps: 10,
        durationInSeconds: 45,
        restAfterInSeconds: 45
      },
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 12,
        durationInSeconds: 45,
        restAfterInSeconds: 30
      },
      {
        exerciseId: 'high-knees-slow',
        sets: 3,
        reps: 20,
        durationInSeconds: 45,
        restAfterInSeconds: 45
      }
    ],
    createdAt: '2024-03-01T00:00:00.000Z'
  }
];