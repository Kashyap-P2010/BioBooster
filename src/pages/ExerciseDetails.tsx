import { motion } from 'framer-motion';
import { ArrowLeft, Award, Dumbbell, ListChecks } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { getExerciseById } from '../data/exercises';
import { Exercise } from '../types';

export default function ExerciseDetails() {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const foundExercise = getExerciseById(id);
      setExercise(foundExercise || null);
      setIsLoading(false);
    }
  }, [id]);
  

  if (!isLoading && !exercise) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Exercise Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the exercise you're looking for.</p>
        <Link to="/exercises">
          <Button variant="primary">
            Return to Exercise Library
          </Button>
        </Link>
      </div>
    );
  }
  
  if (isLoading || !exercise) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-64 w-full max-w-lg bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
        </div>
      </div>
    );
  }
  

  const formatDifficulty = (difficulty: Exercise['difficulty']) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };
  

  const formatCategory = (category: Exercise['category']) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/30';
      case 'intermediate':
        return 'text-warning-600 dark:text-warning-400 bg-warning-100 dark:bg-warning-900/30';
      case 'advanced':
        return 'text-error-600 dark:text-error-400 bg-error-100 dark:bg-error-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };
  
  
  const placeholderImage = exercise.imageUrl;
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to exercises
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 h-[400px]">
            <img
              src={placeholderImage}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
   
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-3">{exercise.name}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(exercise.difficulty)}`}>
              {formatDifficulty(exercise.difficulty)}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {formatCategory(exercise.category)}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <ListChecks className="mr-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
              Instructions
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {exercise.instructions}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
              Target Muscles
            </h2>
            <div className="flex flex-wrap gap-2">
              {exercise.targetMuscles.map((muscle, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary-600 dark:text-primary-400" />
              Benefits
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
              <li>Strengthens {exercise.targetMuscles.join(', ')}</li>
              <li>Improves overall {exercise.category === 'mobility' ? 'flexibility' : 'strength'}</li>
              <li>Can be performed anywhere with no equipment</li>
              {exercise.category === 'full-body' && <li>Elevates heart rate for cardiovascular benefits</li>}
              {exercise.difficulty === 'beginner' && <li>Perfect for beginners to build proper form</li>}
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Link to="/workout/create">
              <Button variant="primary">
                Add to Workout
              </Button>
            </Link>
            <Link to="/exercises">
              <Button variant="outline">
                Browse More Exercises
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
    
    </div>
  );
}