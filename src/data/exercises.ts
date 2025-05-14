import { Exercise } from '../types/exercise';

export const exercises: Exercise[] = [
  // Beginner Exercises
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    description: 'A full-body exercise that increases heart rate and improves coordination.',
    muscleGroups: ['full-body'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'jumping-jacks.jpg',
    instructions: [
      'Stand with your feet together and arms at your sides.',
      'Jump and spread your feet shoulder-width apart while raising your arms above your head.',
      'Jump again and return to the starting position.',
      'Repeat at a brisk pace.'
    ],
    modifications: {
      easier: 'Step out to the side instead of jumping.',
      harder: 'Increase speed or add a squat between jumps.'
    }
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    description: 'A static exercise that builds strength and endurance in your lower body.',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'wall-sit.jpg',
    instructions: [
      'Stand with your back against a wall, feet shoulder-width apart.',
      'Slide down until your thighs are parallel to the ground.',
      'Keep your knees above your ankles, not in front of your toes.',
      'Hold the position for the designated time.'
    ]
  },
  {
    id: 'arm-circles',
    name: 'Arm Circles',
    description: 'A simple exercise that warms up your shoulders and improves mobility.',
    muscleGroups: ['shoulders', 'arms'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'arm-circles.jpg',
    instructions: [
      'Stand with your feet shoulder-width apart.',
      'Extend your arms straight out to the sides at shoulder height.',
      'Move your arms in small circles, gradually increasing the size.',
      'Reverse direction after half the time.'
    ]
  },
  {
    id: 'high-knees-slow',
    name: 'High Knees (slow pace)',
    description: 'A cardio exercise that engages your core and leg muscles at a manageable pace.',
    muscleGroups: ['legs', 'abs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'high-knees-slow.jpg',
    instructions: [
      'Stand with your feet hip-width apart.',
      'Slowly lift one knee to hip height, then lower it.',
      'Repeat with the other knee in a marching motion.',
      'Maintain a controlled pace.'
    ]
  },
  {
    id: 'knee-pushups',
    name: 'Knee Push-Ups',
    description: 'A modified push-up that builds upper body strength with reduced difficulty.',
    muscleGroups: ['chest', 'arms', 'shoulders'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'knee-pushups.jpg',
    instructions: [
      'Start on all fours with hands slightly wider than shoulder-width apart.',
      'Lower your knees to the ground and cross your ankles.',
      'Lower your chest toward the ground by bending your elbows.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'standing-calf-raises',
    name: 'Standing Calf Raises',
    description: 'A simple exercise to strengthen your calves and improve ankle stability.',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'calf-raises.jpg',
    instructions: [
      'Stand with feet hip-width apart.',
      'Raise your heels off the ground, coming up onto your toes.',
      'Lower back down with control.',
      'Repeat the movement.'
    ]
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    description: 'An exercise that targets your glutes and lower back.',
    muscleGroups: ['legs', 'back'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'glute-bridges.jpg',
    instructions: [
      'Lie on your back with knees bent and feet flat.',
      'Lift your hips off the ground by squeezing your glutes.',
      'Hold at the top for a moment.',
      'Lower back down with control.'
    ]
  },
  {
    id: 'bird-dog',
    name: 'Bird-Dog',
    description: 'A core stability exercise that improves balance and coordination.',
    muscleGroups: ['abs', 'back'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'bird-dog.jpg',
    instructions: [
      'Start on hands and knees.',
      'Extend opposite arm and leg.',
      'Hold for a moment, maintaining balance.',
      'Return to start and switch sides.'
    ]
  },
  {
    id: 'side-leg-raises',
    name: 'Side Leg Raises',
    description: 'Targets your outer thighs and hip muscles.',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'side-leg-raises.jpg',
    instructions: [
      'Lie on your side with legs extended.',
      'Lift top leg up while keeping it straight.',
      'Lower back down with control.',
      'Complete all reps before switching sides.'
    ]
  },
  {
    id: 'marching-in-place',
    name: 'Marching in Place',
    description: 'A low-impact cardio exercise that raises heart rate.',
    muscleGroups: ['full-body'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'marching.jpg',
    instructions: [
      'Stand tall with good posture.',
      'Lift knees high, alternating legs.',
      'Swing arms naturally.',
      'Maintain a steady rhythm.'
    ]
  },
  {
    id: 'standing-oblique-crunch',
    name: 'Standing Oblique Crunch',
    description: 'Works your side abs while standing.',
    muscleGroups: ['abs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'oblique-crunch.jpg',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Place hands behind head.',
      'Lift knee while bringing elbow to meet it.',
      'Alternate sides.'
    ]
  },
  {
    id: 'toe-touches',
    name: 'Toe Touches',
    description: 'A simple exercise that improves hamstring flexibility and core strength.',
    muscleGroups: ['abs', 'legs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'toe-touches.jpg',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Bend forward at the waist, keeping legs straight.',
      'Reach for your toes.',
      'Return to standing position.'
    ]
  },
  {
    id: 'shoulder-rolls',
    name: 'Shoulder Rolls',
    description: 'A gentle exercise to release tension in the shoulders and upper back.',
    muscleGroups: ['shoulders'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'shoulder-rolls.jpg',
    instructions: [
      'Stand or sit with good posture.',
      'Roll shoulders forward in circular motion.',
      'Roll shoulders backward in circular motion.',
      'Keep movements slow and controlled.'
    ]
  },
  {
    id: 'wall-pushups',
    name: 'Wall Push-Ups',
    description: 'A beginner-friendly version of push-ups using a wall for support.',
    muscleGroups: ['chest', 'arms', 'shoulders'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'wall-pushups.jpg',
    instructions: [
      'Stand facing wall at arm\'s length.',
      'Place hands on wall at shoulder height.',
      'Lower chest toward wall by bending elbows.',
      'Push back to starting position.'
    ]
  },
  {
    id: 'air-punches',
    name: 'Air Punches',
    description: 'A cardio exercise that works your arms and core while raising heart rate.',
    muscleGroups: ['arms', 'shoulders', 'abs'],
    difficulty: 'beginner',
    durationInSeconds: 30,
    imageUrl: 'air-punches.jpg',
    instructions: [
      'Stand in boxing stance.',
      'Alternate punching arms forward.',
      'Keep core engaged.',
      'Maintain quick, controlled movements.'
    ]
  },
  
  // Intermediate Exercises
  {
    id: 'pushups',
    name: 'Push-Ups',
    description: 'A fundamental exercise that strengthens your chest, shoulders, and triceps.',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'pushups.jpg',
    instructions: [
      'Start in a high plank position with hands slightly wider than shoulder-width apart.',
      'Keep your body in a straight line from head to heels.',
      'Lower your chest toward the ground by bending your elbows.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    description: 'A core strengthening exercise that also engages your shoulders and back.',
    muscleGroups: ['abs', 'shoulders', 'back'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'plank.jpg',
    instructions: [
      'Begin in a forearm plank position, elbows directly beneath your shoulders.',
      'Keep your body in a straight line from head to heels.',
      'Engage your core and glutes.',
      'Hold the position for the designated time.'
    ]
  },
  {
    id: 'squats',
    name: 'Squats',
    description: 'A lower body exercise that builds strength in your quadriceps, hamstrings, and glutes.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'squats.jpg',
    instructions: [
      'Stand with feet shoulder-width apart, toes slightly turned out.',
      'Bend your knees and push your hips back as if sitting in a chair.',
      'Lower until your thighs are parallel to the ground or as far as comfortable.',
      'Push through your heels to return to standing position.'
    ]
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    description: 'A dynamic exercise that combines strength and cardio for a full-body workout.',
    muscleGroups: ['full-body', 'abs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'mountain-climbers.jpg',
    instructions: [
      'Start in a high plank position with hands under shoulders.',
      'Drive one knee toward your chest, then quickly switch legs.',
      'Continue alternating legs in a running motion.',
      'Keep your core tight and hips level throughout.'
    ]
  },
  {
    id: 'reverse-lunges',
    name: 'Reverse Lunges',
    description: 'A unilateral leg exercise that improves balance and builds lower body strength.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'reverse-lunges.jpg',
    instructions: [
      'Stand with feet hip-width apart.',
      'Step one foot back and lower your body until both knees form 90-degree angles.',
      'Push through your front heel to return to standing.',
      'Repeat on the other side.'
    ]
  },
  {
    id: 'triceps-dips',
    name: 'Triceps Dips',
    description: 'Builds strength in your triceps using a chair or elevated surface.',
    muscleGroups: ['arms'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'triceps-dips.jpg',
    instructions: [
      'Place hands on edge of chair behind you.',
      'Lower body by bending elbows.',
      'Push back up to starting position.',
      'Keep elbows close to body.'
    ]
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    description: 'A dynamic core exercise targeting multiple ab muscles.',
    muscleGroups: ['abs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'bicycle-crunches.jpg',
    instructions: [
      'Lie on back, hands behind head.',
      'Lift shoulders off ground.',
      'Bring opposite elbow to opposite knee.',
      'Switch sides in pedaling motion.'
    ]
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    description: 'Targets obliques and core with rotational movement.',
    muscleGroups: ['abs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'russian-twists.jpg',
    instructions: [
      'Sit with knees bent, feet off ground.',
      'Lean back slightly, keeping back straight.',
      'Rotate torso from side to side.',
      'Keep feet elevated throughout.'
    ]
  },
  {
    id: 'side-planks',
    name: 'Side Planks',
    description: 'Strengthens obliques and improves core stability.',
    muscleGroups: ['abs', 'shoulders'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'side-planks.jpg',
    instructions: [
      'Lie on side, prop up on forearm.',
      'Lift hips off ground.',
      'Hold position, keeping body straight.',
      'Switch sides after time.'
    ]
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    description: 'A plyometric exercise that builds explosive power in legs.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'jump-squats.jpg',
    instructions: [
      'Start in squat position.',
      'Explode upward into jump.',
      'Land softly back in squat.',
      'Maintain controlled movement.'
    ]
  },
  {
    id: 'donkey-kicks',
    name: 'Donkey Kicks',
    description: 'Targets glutes and hamstrings while improving hip mobility.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'donkey-kicks.jpg',
    instructions: [
      'Start on hands and knees.',
      'Kick one leg back and up.',
      'Keep knee bent at 90 degrees.',
      'Lower and repeat.'
    ]
  },
  {
    id: 'flutter-kicks',
    name: 'Flutter Kicks',
    description: 'A challenging core exercise that targets lower abs.',
    muscleGroups: ['abs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'flutter-kicks.jpg',
    instructions: [
      'Lie on back, legs extended.',
      'Lift legs slightly off ground.',
      'Alternate kicking legs up and down.',
      'Keep lower back pressed to floor.'
    ]
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    description: 'A full-body movement that improves coordination and strength.',
    muscleGroups: ['full-body'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'bear-crawl.jpg',
    instructions: [
      'Start on hands and feet.',
      'Move forward, keeping hips low.',
      'Alternate opposite hand and foot.',
      'Maintain core engagement.'
    ]
  },
  {
    id: 'jumping-lunges',
    name: 'Jumping Lunges',
    description: 'A dynamic leg exercise that builds power and endurance.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'jumping-lunges.jpg',
    instructions: [
      'Start in lunge position.',
      'Jump and switch legs mid-air.',
      'Land softly in lunge.',
      'Continue alternating legs.'
    ]
  },
  {
    id: 'superman-hold',
    name: 'Superman Hold',
    description: 'Strengthens lower back and improves posture.',
    muscleGroups: ['back'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'superman-hold.jpg',
    instructions: [
      'Lie face down, arms extended.',
      'Lift arms and legs off ground.',
      'Hold position.',
      'Lower with control.'
    ]
  },
  {
    id: 'inchworm-walkouts',
    name: 'Inchworm Walkouts',
    description: 'A dynamic stretch that builds shoulder strength and hamstring flexibility.',
    muscleGroups: ['full-body'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'inchworm-walkouts.jpg',
    instructions: [
      'Stand tall, bend to touch toes.',
      'Walk hands out to plank.',
      'Hold plank briefly.',
      'Walk feet back to hands.'
    ]
  },
  {
    id: 'skaters',
    name: 'Skaters',
    description: 'A lateral movement that improves balance and leg strength.',
    muscleGroups: ['legs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'skaters.jpg',
    instructions: [
      'Jump sideways landing on one leg.',
      'Touch opposite hand to ground.',
      'Jump to other side.',
      'Continue alternating sides.'
    ]
  },
  {
    id: 'plank-shoulder-taps',
    name: 'Plank Shoulder Taps',
    description: 'Challenges core stability while engaging shoulders.',
    muscleGroups: ['abs', 'shoulders'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'plank-shoulder-taps.jpg',
    instructions: [
      'Start in high plank.',
      'Tap opposite shoulder with hand.',
      'Keep hips stable.',
      'Alternate sides.'
    ]
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    description: 'A core exercise that promotes stability and coordination.',
    muscleGroups: ['abs'],
    difficulty: 'intermediate',
    durationInSeconds: 30,
    imageUrl: 'dead-bug.jpg',
    instructions: [
      'Lie on back, arms up.',
      'Extend opposite arm and leg.',
      'Return to start position.',
      'Alternate sides.'
    ]
  },
  
  // Advanced Exercises
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'A high-intensity exercise that builds strength, endurance, and cardiovascular fitness.',
    muscleGroups: ['full-body'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'burpees.jpg',
    instructions: [
      'Start in a standing position.',
      'Drop into a squat and place your hands on the ground.',
      'Jump your feet back into a plank position.',
      'Perform a push-up (optional).',
      'Jump your feet forward to return to a squat.',
      'Explosively jump up with arms overhead.'
    ]
  },
  {
    id: 'diamond-pushups',
    name: 'Diamond Push-Ups',
    description: 'A challenging push-up variation that targets your triceps and chest.',
    muscleGroups: ['chest', 'arms'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'diamond-pushups.jpg',
    instructions: [
      'Start in a high plank position with hands close together, forming a diamond shape with thumbs and index fingers.',
      'Keep your elbows close to your body.',
      'Lower your chest toward your hands.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'one-leg-squats-assisted',
    name: 'One-Leg Squats (Assisted)',
    description: 'A challenging unilateral exercise that builds strength and balance in your lower body.',
    muscleGroups: ['legs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'one-leg-squats-assisted.jpg',
    instructions: [
      'Stand on one leg with the other leg extended forward.',
      'Hold onto a support with one hand for balance.',
      'Lower into a squat on your standing leg.',
      'Push through your heel to return to standing.',
      'Complete all reps on one side before switching.'
    ]
  },
  {
    id: 'decline-pushups',
    name: 'Decline Push-Ups',
    description: 'A push-up variation that increases the challenge by elevating your feet.',
    muscleGroups: ['chest', 'shoulders'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'decline-pushups.jpg',
    instructions: [
      'Place your feet on an elevated surface (bench, chair, step).',
      'Position your hands on the floor, slightly wider than shoulder-width apart.',
      'Lower your chest toward the ground by bending your elbows.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'pike-pushups',
    name: 'Pike Push-Ups',
    description: 'A shoulder-focused exercise that mimics the movement of a handstand push-up.',
    muscleGroups: ['shoulders', 'arms'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'pike-pushups.jpg',
    instructions: [
      'Start in a high plank position.',
      'Walk your feet in and lift your hips high to form an inverted V shape.',
      'Bend your elbows to lower your head toward the ground.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'wall-handstand-hold',
    name: 'Wall Handstand Hold',
    description: 'An advanced exercise for shoulder strength and balance.',
    muscleGroups: ['shoulders', 'arms'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'handstand-hold.jpg',
    instructions: [
      'Start in plank position facing wall.',
      'Walk feet up wall while walking hands closer.',
      'Hold position with body aligned.',
      'Maintain tight core and straight arms.'
    ]
  },
  {
    id: 'tuck-jumps',
    name: 'Tuck Jumps',
    description: 'A plyometric exercise that builds explosive power and coordination.',
    muscleGroups: ['legs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'tuck-jumps.jpg',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Jump explosively upward.',
      'Tuck knees to chest mid-air.',
      'Land softly and immediately repeat.'
    ]
  },
  {
    id: 'plank-to-pushup',
    name: 'Plank to Push-Up',
    description: 'A challenging combination movement for full upper body.',
    muscleGroups: ['chest', 'arms', 'shoulders'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'plank-pushup.jpg',
    instructions: [
      'Start in forearm plank position.',
      'Push up to hand plank one arm at a time.',
      'Lower back to forearm plank one arm at a time.',
      'Alternate leading arms.'
    ]
  },
  {
    id: 'v-ups',
    name: 'V-Ups',
    description: 'An advanced core exercise that targets both upper and lower abs.',
    muscleGroups: ['abs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'v-ups.jpg',
    instructions: [
      'Lie on back with arms extended overhead.',
      'Lift legs and upper body simultaneously.',
      'Touch hands to feet at the top.',
      'Lower back down with control.'
    ]
  },
  {
    id: 'plank-jacks',
    name: 'Plank Jacks',
    description: 'Combines plank stability with cardio movement.',
    muscleGroups: ['full-body'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'plank-jacks.jpg',
    instructions: [
      'Start in high plank position.',
      'Jump feet out wide.',
      'Jump feet back together.',
      'Maintain plank position throughout.'
    ]
  },
  {
    id: 'jumping-knee-tucks',
    name: 'Jumping Knee Tucks',
    description: 'A dynamic exercise that builds explosive power and core strength.',
    muscleGroups: ['legs', 'abs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'knee-tucks.jpg',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Jump up bringing knees to chest.',
      'Land softly and immediately repeat.',
      'Keep core engaged throughout.'
    ]
  },
  {
    id: 'side-to-side-pushups',
    name: 'Side-to-Side Push-Ups',
    description: 'A push-up variation that adds lateral movement.',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'side-pushups.jpg',
    instructions: [
      'Start in push-up position.',
      'Lower chest toward ground.',
      'Push up and shift body sideways.',
      'Continue alternating sides.'
    ]
  },
  {
    id: 'squat-pulses',
    name: 'Squat Pulses',
    description: 'Intensifies the squat by maintaining tension in the legs.',
    muscleGroups: ['legs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'squat-pulses.jpg',
    instructions: [
      'Lower into squat position.',
      'Pulse up and down slightly.',
      'Maintain tension throughout.',
      'Keep weight in heels.'
    ]
  },
  {
    id: 'elevated-glute-bridge',
    name: 'Elevated Glute Bridge',
    description: 'An advanced variation of the glute bridge using elevation.',
    muscleGroups: ['legs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'elevated-bridge.jpg',
    instructions: [
      'Place feet on elevated surface.',
      'Lift hips toward ceiling.',
      'Squeeze glutes at top.',
      'Lower with control.'
    ]
  },
  {
    id: 'hollow-body-hold',
    name: 'Hollow Body Hold',
    description: 'An advanced core exercise for total ab strength.',
    muscleGroups: ['abs'],
    difficulty: 'advanced',
    durationInSeconds: 30,
    imageUrl: 'hollow-body.jpg',
    instructions: [
      'Lie on back, arms extended overhead.',
      'Lift shoulders and legs off ground.',
      'Create a dish shape with body.',
      'Hold position while maintaining lower back contact.'
    ]
  }
];

// Helper functions to filter exercises
export const getExercisesByDifficulty = (difficulty: string) => {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByMuscleGroup = (muscleGroup: string) => {
  return exercises.filter(exercise => exercise.muscleGroups.includes(muscleGroup as any));
};

export const getExerciseById = (id: string) => {
  return exercises.find(exercise => exercise.id === id);
};

export const beginnerExercises = getExercisesByDifficulty('beginner');
export const intermediateExercises = getExercisesByDifficulty('intermediate');
export const advancedExercises = getExercisesByDifficulty('advanced');