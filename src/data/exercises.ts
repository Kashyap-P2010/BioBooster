import { Exercise, MuscleGroup, DifficultyLevel, Equipment, AgeGroup } from '../models/Exercise';
import { v4 as uuidv4 } from 'uuid';

// Default bodyweight exercises with detailed information
export const exercises: Exercise[] = [
  {
    id: uuidv4(),
    name: 'Push-Up',
    description: 'A classic upper body exercise that targets the chest, shoulders, and triceps.',
    muscleGroups: [MuscleGroup.Chest, MuscleGroup.Shoulders, MuscleGroup.Arms],
    difficulty: DifficultyLevel.Intermediate,
    imageUrl: 'https://images.pexels.com/photos/176782/pexels-photo-176782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width apart',
      'Keep your body in a straight line from head to heels',
      'Lower your body until your chest nearly touches the floor',
      'Push back up to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult],
    tips: [
      'Keep your core engaged throughout the movement',
      'Look slightly ahead of you, not directly at the floor',
      'Don\'t let your hips sag or pike up'
    ],
    recommended: {
      reps: { min: 8, max: 12 },
      sets: { min: 2, max: 4 },
      restBetweenSets: 60
    },
    variations: [
      {
        name: 'Knee Push-Up',
        description: 'An easier variation where knees are placed on the ground',
        difficulty: DifficultyLevel.Beginner
      },
      {
        name: 'Diamond Push-Up',
        description: 'A more challenging variation where hands form a diamond shape',
        difficulty: DifficultyLevel.Advanced
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Bodyweight Squat',
    description: 'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    muscleGroups: [MuscleGroup.Legs, MuscleGroup.Glutes],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/4386324/pexels-photo-4386324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Keep your chest up and back straight',
      'Bend your knees and hips to lower your body as if sitting in a chair',
      'Lower until thighs are parallel to the ground (or as low as comfortable)',
      'Push through your heels to return to standing position'
    ],
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Keep weight in your heels',
      'Ensure knees track over toes, not caving inward',
      'Drive knees outward slightly during the movement'
    ],
    recommended: {
      reps: { min: 12, max: 15 },
      sets: { min: 3, max: 4 },
      restBetweenSets: 60
    },
    variations: [
      {
        name: 'Sumo Squat',
        description: 'A wider stance that emphasizes inner thighs',
        difficulty: DifficultyLevel.Beginner
      },
      {
        name: 'Jump Squat',
        description: 'Adding explosive jump at the top of the movement',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Plank',
    description: 'An isometric core exercise that builds abdominal and total body strength.',
    muscleGroups: [MuscleGroup.Core, MuscleGroup.Shoulders],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/6455884/pexels-photo-6455884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Start in push-up position with forearms on the ground',
      'Keep elbows directly below shoulders',
      'Maintain a straight line from head to heels',
      'Hold the position without allowing hips to rise or drop'
    ],
    duration: 30, // 30 seconds
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Breathe steadily throughout the hold',
      'Engage your core by drawing your navel toward your spine',
      'Keep neck in neutral position, don\'t drop or lift head'
    ],
    recommended: {
      sets: { min: 2, max: 3 },
      restBetweenSets: 45
    },
    variations: [
      {
        name: 'Side Plank',
        description: 'Rotated position to emphasize obliques',
        difficulty: DifficultyLevel.Intermediate
      },
      {
        name: 'Plank with Shoulder Taps',
        description: 'Adding movement by tapping opposite shoulders',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Lunges',
    description: 'A unilateral lower body exercise that develops strength and balance.',
    muscleGroups: [MuscleGroup.Legs, MuscleGroup.Glutes],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/6551133/pexels-photo-6551133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Stand with feet hip-width apart',
      'Take a step forward with one leg',
      'Lower your body until both knees form 90-degree angles',
      'Push through the front heel to return to the starting position',
      'Repeat with the other leg'
    ],
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Keep your torso upright throughout the movement',
      'Don\'t let your front knee extend past your toes',
      'Keep weight distributed between both legs'
    ],
    recommended: {
      reps: { min: 10, max: 12 },
      sets: { min: 2, max: 3 },
      restBetweenSets: 60
    },
    variations: [
      {
        name: 'Reverse Lunge',
        description: 'Stepping backward instead of forward',
        difficulty: DifficultyLevel.Beginner
      },
      {
        name: 'Walking Lunge',
        description: 'Continuously moving forward with each rep',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Glute Bridge',
    description: 'An exercise targeting the glutes and lower back that can be performed by all fitness levels.',
    muscleGroups: [MuscleGroup.Glutes, MuscleGroup.Core],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/6551096/pexels-photo-6551096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor',
      'Place arms at your sides with palms facing down',
      'Push through your heels to lift hips off the ground',
      'Squeeze glutes at the top position',
      'Lower back down with control'
    ],
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Keep abs engaged to prevent excessive arching of the lower back',
      'Drive through the heels rather than the toes',
      'Keep the movement controlled and deliberate'
    ],
    recommended: {
      reps: { min: 12, max: 15 },
      sets: { min: 2, max: 3 },
      restBetweenSets: 45
    },
    variations: [
      {
        name: 'Single-Leg Glute Bridge',
        description: 'Performing with one leg raised for added difficulty',
        difficulty: DifficultyLevel.Intermediate
      },
      {
        name: 'Elevated Glute Bridge',
        description: 'Feet elevated on a stable surface for increased range of motion',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Mountain Climbers',
    description: 'A dynamic full-body exercise that combines strength and cardio benefits.',
    muscleGroups: [MuscleGroup.Core, MuscleGroup.Cardio, MuscleGroup.Shoulders],
    difficulty: DifficultyLevel.Intermediate,
    imageUrl: 'https://images.pexels.com/photos/6456649/pexels-photo-6456649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Start in a push-up position with arms straight',
      'Keep your body in a straight line from head to heels',
      'Alternate bringing knees toward chest in a running motion',
      'Maintain a quick, controlled pace'
    ],
    duration: 30, // 30 seconds
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult],
    tips: [
      'Keep hips level throughout the movement',
      'Engage core to prevent back from arching',
      'Breathe rhythmically with the movement'
    ],
    recommended: {
      sets: { min: 2, max: 3 },
      restBetweenSets: 45
    },
    variations: [
      {
        name: 'Slow Mountain Climbers',
        description: 'Performing at a slower pace for strength focus',
        difficulty: DifficultyLevel.Beginner
      },
      {
        name: 'Cross-Body Mountain Climbers',
        description: 'Bringing knee toward opposite elbow for oblique engagement',
        difficulty: DifficultyLevel.Advanced
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Wall Sit',
    description: 'An isometric exercise that builds leg endurance and strength.',
    muscleGroups: [MuscleGroup.Legs, MuscleGroup.Glutes],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/4793235/pexels-photo-4793235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Stand with back against a wall',
      'Walk feet out and slide down until knees are at 90 degrees',
      'Keep back flat against the wall',
      'Hold the position for the prescribed time'
    ],
    duration: 45, // 45 seconds
    equipment: [Equipment.Wall],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Keep weight in heels',
      'Keep knees aligned with ankles, not caving inward',
      'Breathe steadily throughout the hold'
    ],
    recommended: {
      sets: { min: 2, max: 3 },
      restBetweenSets: 60
    },
    variations: [
      {
        name: 'Single-Leg Wall Sit',
        description: 'Holding one leg out straight for increased difficulty',
        difficulty: DifficultyLevel.Advanced
      },
      {
        name: 'Wall Sit with Calf Raise',
        description: 'Adding calf raises while holding the wall sit position',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Bird Dog',
    description: 'A core stabilization exercise that promotes balance and coordination.',
    muscleGroups: [MuscleGroup.Core, MuscleGroup.Back],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/6975444/pexels-photo-6975444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Start on hands and knees in a tabletop position',
      'Extend right arm forward and left leg backward simultaneously',
      'Return to starting position',
      'Repeat with left arm and right leg'
    ],
    equipment: [Equipment.None],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult, AgeGroup.Senior],
    tips: [
      'Keep spine neutral and avoid arching back',
      'Move slowly with control',
      'Keep hips level throughout the movement'
    ],
    recommended: {
      reps: { min: 8, max: 10 },
      sets: { min: 2, max: 3 },
      restBetweenSets: 45
    },
    variations: [
      {
        name: 'Bird Dog with Elbow to Knee',
        description: 'Bringing elbow and knee together under the body before extending',
        difficulty: DifficultyLevel.Intermediate
      },
      {
        name: 'Bird Dog Hold',
        description: 'Holding the extended position for time',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Tricep Dips',
    description: 'An upper body exercise focusing on the triceps using a chair or bench.',
    muscleGroups: [MuscleGroup.Arms, MuscleGroup.Shoulders],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/4803649/pexels-photo-4803649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Sit on the edge of a chair with hands gripping the edge',
      'Slide buttocks off the edge and lower body by bending elbows',
      'Lower until elbows reach about 90 degrees',
      'Push back up to the starting position'
    ],
    equipment: [Equipment.Chair],
    ageGroups: [AgeGroup.Teen, AgeGroup.Adult],
    tips: [
      'Keep shoulders down and away from ears',
      'Keep elbows pointing directly behind you',
      'The closer your feet are to your body, the easier the exercise'
    ],
    recommended: {
      reps: { min: 10, max: 12 },
      sets: { min: 2, max: 3 },
      restBetweenSets: 60
    },
    variations: [
      {
        name: 'Straight Leg Dips',
        description: 'Performing with legs extended for increased difficulty',
        difficulty: DifficultyLevel.Intermediate
      },
      {
        name: 'Elevated Feet Dips',
        description: 'Placing feet on another chair for increased load',
        difficulty: DifficultyLevel.Advanced
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Seated Leg Lifts',
    description: 'A gentle exercise for seniors to strengthen the quadriceps.',
    muscleGroups: [MuscleGroup.Legs],
    difficulty: DifficultyLevel.Beginner,
    imageUrl: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    instructions: [
      'Sit on a chair with back straight and feet flat on floor',
      'Slowly extend one leg until straight',
      'Hold for 2-3 seconds',
      'Lower leg back to starting position',
      'Repeat with the other leg'
    ],
    equipment: [Equipment.Chair],
    ageGroups: [AgeGroup.Senior],
    tips: [
      'Keep back straight against the chair',
      'Exhale as you lift leg, inhale as you lower',
      'For added difficulty, hold the extended position longer'
    ],
    recommended: {
      reps: { min: 8, max: 12 },
      sets: { min: 2, max: 3 },
      restBetweenSets: 30
    },
    variations: [
      {
        name: 'Ankle Circles',
        description: 'Adding ankle rotations when leg is extended',
        difficulty: DifficultyLevel.Beginner
      },
      {
        name: 'Seated Leg Lift with Resistance',
        description: 'Using a resistance band for additional challenge',
        difficulty: DifficultyLevel.Intermediate
      }
    ]
  }
];