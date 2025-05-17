import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'pushups-regular',
    name: 'Push-ups (Regular)',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    imageUrl: '/src/components/images/pushups-regular.jpg'
  },
  {
    id: 'diamond-pushups',
    name: 'Diamond Push-ups',
    category: 'upper-body',
    difficulty: 'advanced',
    instructions: 'Form a diamond shape with your hands under your chest. Keep your elbows close to your body as you lower and push up.',
    targetMuscles: ['triceps', 'chest', 'shoulders'],
    imageUrl: '/src/components/images/diamond-pushups.webp'
  },
  {
    id: 'wide-pushups',
    name: 'Wide Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Place your hands wider than shoulder-width apart. Lower your body and push back up, focusing on chest engagement.',
    targetMuscles: ['chest', 'shoulders'],
    imageUrl: '/src/components/images/wide-pushups.webp'
  },
  {
    id: 'pike-pushups',
    name: 'Pike Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Form an inverted V with your body, hands and feet on the ground. Lower your head toward the ground and push back up.',
    targetMuscles: ['shoulders', 'triceps'],
    imageUrl: '/src/components/images/pike-pushups.webp'
  },
  {
    id: 'triceps-dips',
    name: 'Triceps Dips',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Using a chair or bench, place hands on the edge with fingers facing forward. Lower your body by bending your elbows, then push back up.',
    targetMuscles: ['triceps', 'shoulders', 'chest'],
    imageUrl: '/src/components/images/triceps-dips.jpeg'
  },
  {
    id: 'incline-pushups',
    name: 'Incline Push-ups',
    category: 'upper-body',
    difficulty: 'beginner',
    instructions: 'Place hands on an elevated surface like a bench or step. Perform a push-up while keeping your body straight.',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    imageUrl: '/src/components/images/incline-pushups.jpeg'
  },
  {
    id: 'handstand-pushups',
    name: 'Handstand Push-ups',
    category: 'upper-body',
    difficulty: 'advanced',
    instructions: 'Get into a handstand position against a wall. Lower your head toward the ground and push back up.',
    targetMuscles: ['shoulders', 'triceps', 'upper back'],
    imageUrl: '/src/components/images/handstand-pushups.jpeg'
  },
  {
    id: 'arm-circles',
    name: 'Arm Circles',
    category: 'upper-body',
    difficulty: 'beginner',
    instructions: 'Extend arms straight out to sides at shoulder height. Make small circular motions, gradually increasing circle size.',
    targetMuscles: ['shoulders', 'upper back'],
    imageUrl: '/src/components/images/arm-circles.png'
  },
  {
    id: 'plank-shoulder-taps',
    name: 'Plank Shoulder Taps',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Start in a high plank position. Tap your left shoulder with your right hand, then right shoulder with left hand, alternating while maintaining a stable core.',
    targetMuscles: ['shoulders', 'core', 'chest'],
    imageUrl: '/src/components/images/plank-shoulder-taps.jpg'
  },
  {
    id: 'bicep-pushups',
    name: 'Bicep Push-ups',
    category: 'upper-body',
    difficulty: 'intermediate',
    instructions: 'Similar to regular push-ups but with elbows kept tight against body and hands positioned under shoulders, focusing on bicep engagement.',
    targetMuscles: ['biceps', 'chest', 'triceps'],
    imageUrl: '/src/components/images/bicep-pushups.jpeg'
  },
  
  {
    id: 'planks',
    name: 'Planks',
    category: 'core',
    difficulty: 'beginner',
    instructions: 'Hold a forearm or high plank position with your body in a straight line from head to heels. Engage your core and hold the position.',
    targetMuscles: ['core', 'shoulders', 'back'],
    imageUrl: '/src/components/images/plank.png'
  },
  {
    id: 'side-plank',
    name: 'Side Plank',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Lie on your side with legs stacked. Prop yourself up on your elbow or hand, forming a straight line from head to feet. Hold this position.',
    targetMuscles: ['obliques', 'core', 'shoulders'],
    imageUrl: '/src/components/images/side-plank.jpeg'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Sit on the floor with knees bent. Lean back slightly, keeping back straight. Twist torso from side to side, touching the floor beside you.',
    targetMuscles: ['obliques', 'core'],
    imageUrl: '/src/components/images/russian-twists.webp'
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Lie on your back with hands behind head. Bring opposite elbow to opposite knee, alternating sides with a pedaling motion.',
    targetMuscles: ['abs', 'obliques'],
    imageUrl: '/src/components/images/bicycle-crunches.webp'
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Lie flat on your back with legs extended. Keeping legs straight, lift them up to a 90-degree angle, then lower them without touching the ground.',
    targetMuscles: ['lower abs', 'hip flexors'],
    imageUrl: '/src/components/images/leg-raises.webp'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Start in a high plank position. Alternate bringing each knee toward your chest in a running motion while maintaining a stable upper body.',
    targetMuscles: ['core', 'shoulders', 'hip flexors'],
    imageUrl: '/src/components/images/mountain-climbers.png'
  },
  {
    id: 'flutter-kicks',
    name: 'Flutter Kicks',
    category: 'core',
    difficulty: 'intermediate',
    instructions: 'Lie on your back with legs extended and slightly lifted. Kick legs up and down in a fluttering motion without touching the ground.',
    targetMuscles: ['lower abs', 'hip flexors'],
    imageUrl: '/src/components/images/flutter-kicks.webp'
  },
  {
    id: 'v-ups',
    name: 'V-ups',
    category: 'core',
    difficulty: 'advanced',
    instructions: 'Lie on your back with arms extended overhead and legs straight. Simultaneously lift upper body and legs, forming a V-shape, reaching hands toward toes.',
    targetMuscles: ['abs', 'hip flexors'],
    imageUrl: '/src/components/images/vups.jpeg'
  },
  {
    id: 'toe-touches',
    name: 'Lying Toe Touches',
    category: 'core',
    difficulty: 'beginner',
    instructions: 'Lie on your back with legs straight up at a 90-degree angle. Reach hands up to touch toes, lifting shoulders off the ground.',
    targetMuscles: ['abs', 'shoulders'],
    imageUrl: '/src/components/images/toe-touches.jpg'
  },
  {
    id: 'superman-holds',
    name: 'Superman Holds',
    category: 'core',
    difficulty: 'beginner',
    instructions: 'Lie face down with arms extended overhead. Simultaneously lift arms, chest, and legs off the ground, hold, and lower.',
    targetMuscles: ['lower back', 'glutes', 'shoulders'],
    imageUrl: '/src/components/images/superman-holds.jpeg'
  },
  
  {
    id: 'squats',
    name: 'Squats',
    category: 'lower-body',
    difficulty: 'beginner',
    instructions: 'Stand with feet shoulder-width apart. Lower your body by bending knees and pushing hips back, as if sitting in a chair. Return to standing.',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    imageUrl: '/src/components/images/squats.jpeg'
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Step forward with one leg and lower your body until both knees are bent at 90-degree angles. Push back to starting position and alternate legs.',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    imageUrl: '/src/components/images/lunges.jpeg'
  },
  {
    id: 'bulgarian-split-squats',
    name: 'Bulgarian Split Squats',
    category: 'lower-body',
    difficulty: 'advanced',
    instructions: 'Place one foot on a bench behind you. Lower your body until your front thigh is parallel to the ground, then push back up.',
    targetMuscles: ['quadriceps', 'glutes', 'hamstrings'],
    imageUrl: '/src/components/images/bulgarian-split-squats.jpeg'
  },
  {
    id: 'step-ups',
    name: 'Step-ups',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Stand in front of a bench or step. Step up with one foot, bringing the other foot up, then step back down. Alternate legs.',
    targetMuscles: ['quadriceps', 'glutes', 'calves'],
    imageUrl: '/src/components/images/step-ups.jpeg'
    // THIS IS THE LAST THING I DID! GOTTA DO THE REST!
  },
  {
    id: 'glute-bridges',
    name: 'Glute Bridges',
    category: 'lower-body',
    difficulty: 'beginner',
    instructions: 'Lie on your back with knees bent and feet flat on the floor. Lift hips toward ceiling by squeezing glutes, then lower back down.',
    targetMuscles: ['glutes', 'hamstrings', 'lower back'],
    imageUrl: '/src/components/images/glute-bridges.jpg'
  },
  {
    id: 'single-leg-glute-bridges',
    name: 'Single-Leg Glute Bridges',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Similar to regular glute bridges, but with one leg extended straight. Lift hips by pushing through the planted foot.',
    targetMuscles: ['glutes', 'hamstrings', 'core'],
    imageUrl: '/src/components/images/single-leg-glute-bridges.jpg'
  },
  {
    id: 'curtsy-lunges',
    name: 'Curtsy Lunges',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Step one foot behind and across your body, bending both knees as if curtseying. Return to standing and alternate sides.',
    targetMuscles: ['glutes', 'quadriceps', 'inner thighs'],
    imageUrl: '/src/components/images/curtsy-lunges.jpg'
  },
  {
    id: 'sumo-squats',
    name: 'Sumo Squats',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Stand with feet wider than shoulder-width and toes pointed outward. Lower into a squat position, keeping chest up and knees tracking over toes.',
    targetMuscles: ['inner thighs', 'glutes', 'quadriceps'],
    imageUrl: '/src/components/images/sumo-squats.jpg'
  },
  {
    id: 'jump-squats',
    name: 'Jump Squats',
    category: 'lower-body',
    difficulty: 'intermediate',
    instructions: 'Perform a squat, then explosively jump upward. Land softly and immediately lower into the next squat.',
    targetMuscles: ['quadriceps', 'glutes', 'calves'],
    imageUrl: '/src/components/images/jump-squats.jpg'
  },
  {
    id: 'wall-sit',
    name: 'Wall Sit',
    category: 'lower-body',
    difficulty: 'beginner',
    instructions: 'Lean against a wall with feet shoulder-width apart. Slide down until thighs are parallel to the ground, forming a 90-degree angle. Hold this position.',
    targetMuscles: ['quadriceps', 'glutes', 'calves'],
    imageUrl: '/src/components/images/wall-sit.jpg'
  },
  
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'full-body',
    difficulty: 'advanced',
    instructions: 'Begin standing, then squat down, kick feet back into a plank, perform a push-up, jump feet forward, and explosively jump up with arms overhead.',
    targetMuscles: ['full body'],
    imageUrl: '/src/components/images/burpees.jpg'
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'full-body',
    difficulty: 'beginner',
    instructions: 'Start standing with arms at sides. Jump feet out wide while raising arms overhead, then jump back to starting position.',
    targetMuscles: ['shoulders', 'calves', 'hip abductors'],
    imageUrl: '/src/components/images/jumping-jacks.jpg'
  },
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Run in place, lifting knees as high as possible toward chest. Maintain a quick pace while pumping arms.',
    targetMuscles: ['hip flexors', 'quads', 'calves', 'core'],
    imageUrl: '/src/components/images/high-knees.jpg'
  },
  {
    id: 'butt-kicks',
    name: 'Butt Kicks',
    category: 'full-body',
    difficulty: 'beginner',
    instructions: 'Run in place, kicking heels up toward buttocks with each step. Maintain a quick pace while keeping upper body stable.',
    targetMuscles: ['hamstrings', 'glutes', 'calves'],
    imageUrl: '/src/components/images/butt-kicks.jpg'
  },
  {
    id: 'mountain-climbers-cardio',
    name: 'Mountain Climbers',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Start in a high plank position. Alternate bringing each knee toward your chest in a running motion while maintaining a stable upper body.',
    targetMuscles: ['core', 'shoulders', 'hip flexors', 'quads'],
    imageUrl: '/src/components/images/mountain-climbers-cardio.jpg'
  },
  {
    id: 'skater-jumps',
    name: 'Skater Jumps',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Jump laterally from one foot to the other, mimicking a speed skater. Land softly on the outside foot and swing arms across body.',
    targetMuscles: ['glutes', 'quads', 'calves', 'core'],
    imageUrl: '/src/components/images/skater-jumps.jpg'
  },
  {
    id: 'plank-jacks',
    name: 'Plank Jacks',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Start in a high plank position. Jump feet out wide and then back together, similar to a jumping jack motion.',
    targetMuscles: ['core', 'shoulders', 'chest', 'legs'],
    imageUrl: '/src/components/images/plank-jacks.jpg'
  },
  {
    id: 'broad-jumps',
    name: 'Broad Jumps',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Stand with feet hip-width apart. Swing arms back, then forward as you jump horizontally as far as possible. Land softly and repeat.',
    targetMuscles: ['glutes', 'quads', 'calves', 'core'],
    imageUrl: '/src/components/images/broad-jumps.jpg'
  },
  {
    id: 'bear-crawls',
    name: 'Bear Crawls',
    category: 'full-body',
    difficulty: 'intermediate',
    instructions: 'Start on hands and knees with knees hovering just above the ground. Move forward by simultaneously moving opposite hand and foot.',
    targetMuscles: ['shoulders', 'core', 'quadriceps', 'triceps'],
    imageUrl: '/src/components/images/bear-crawls.jpg'
  },
  {
    id: 'crab-walks',
    name: 'Crab Walks',
    category: 'full-body',
    difficulty: 'beginner',
    instructions: 'Sit on the floor, place hands behind you with fingers pointing toward feet. Lift hips and walk backward using hands and feet.',
    targetMuscles: ['triceps', 'shoulders', 'core', 'glutes'],
    imageUrl: '/src/components/images/crab-walks.jpg'
  },
  
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Start on hands and knees. Alternate between arching back upward (cat) and letting it sag while lifting head (cow).',
    targetMuscles: ['spine', 'neck', 'core'],
    imageUrl: '/src/components/images/cat-cow.jpg'
  },
  {
    id: 'downdog-cobra',
    name: 'Downward Dog to Cobra',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Flow between downward dog position (inverted V) and cobra pose (lying face down, lifting chest with arms).',
    targetMuscles: ['shoulders', 'hamstrings', 'chest', 'spine'],
    imageUrl: '/src/components/images/downdog-cobra.jpg'
  },
  {
    id: 'hip-circles',
    name: 'Hip Circles',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Stand with feet hip-width apart. Place hands on hips and make circular motions with hips in both directions.',
    targetMuscles: ['hip flexors', 'lower back'],
    imageUrl: '/src/components/images/hip-circles.jpg'
  },
  {
    id: 'lunge-twist',
    name: 'Lunge with Twist',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Step into a lunge position. Rotate your torso toward the front leg side, then switch sides.',
    targetMuscles: ['hip flexors', 'obliques', 'quadriceps'],
    imageUrl: '/src/components/images/lunge-twist.jpg'
  },
  {
    id: 'standing-toe-touches',
    name: 'Standing Toe Touches',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Stand with feet hip-width apart. Bend at the waist and reach for your toes, keeping legs straight or slightly bent.',
    targetMuscles: ['hamstrings', 'lower back'],
    imageUrl: '/src/components/images/standing-toe-touches.jpg'
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Sit with legs extended straight in front. Hinge at hips and reach for toes, keeping back straight.',
    targetMuscles: ['hamstrings', 'lower back'],
    imageUrl: '/src/components/images/seated-forward-fold.jpg'
  },
  {
    id: 'childs-pose',
    name: 'Child\'s Pose',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Kneel on the floor, then sit back on heels. Extend arms forward and lower torso to the ground, resting forehead on mat.',
    targetMuscles: ['lower back', 'shoulders', 'hips'],
    imageUrl: '/src/components/images/childs-pose.jpg'
  },
  {
    id: 'thread-the-needle',
    name: 'Thread the Needle',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Start on hands and knees. Thread one arm under and across body, reaching toward opposite side. Rotate chest toward the ground.',
    targetMuscles: ['shoulders', 'upper back', 'spine'],
    imageUrl: '/src/components/images/thread-the-needle.jpg'
  },
  {
    id: 'leg-swings',
    name: 'Leg Swings',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Hold onto a wall or support. Swing one leg forward and backward in a controlled motion. Switch sides.',
    targetMuscles: ['hip flexors', 'hamstrings'],
    imageUrl: '/src/components/images/leg-swings.jpg'
  },
  {
    id: 'ankle-bounces',
    name: 'Ankle Bounces',
    category: 'mobility',
    difficulty: 'beginner',
    instructions: 'Stand with feet hip-width apart. Rise onto balls of feet and bounce gently up and down to activate calves.',
    targetMuscles: ['calves', 'ankles'],
    imageUrl: '/src/components/images/ankle-bounces.jpg'
  }
];

export const getExercisesByCategory = (category: Exercise['category']) => {
  return exercises.filter(exercise => exercise.category === category);
};

export const getExerciseById = (id: string) => {
  return exercises.find(exercise => exercise.id === id);
};

export const searchExercises = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return exercises.filter(
    exercise => 
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.instructions.toLowerCase().includes(lowercaseQuery) ||
      exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterExercisesByDifficulty = (difficulty: Exercise['difficulty']) => {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
};

export const filterExercises = (
  category?: Exercise['category'],
  difficulty?: Exercise['difficulty'],
  query?: string
) => {
  let filtered = [...exercises];
  
  if (category) {
    filtered = filtered.filter(exercise => exercise.category === category);
  }
  
  if (difficulty) {
    filtered = filtered.filter(exercise => exercise.difficulty === difficulty);
  }
  
  if (query) {
    const lowercaseQuery = query.toLowerCase();
    filtered = filtered.filter(
      exercise => 
        exercise.name.toLowerCase().includes(lowercaseQuery) ||
        exercise.instructions.toLowerCase().includes(lowercaseQuery) ||
        exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  return filtered;
};