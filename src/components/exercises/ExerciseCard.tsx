import { Clock, BarChart2 } from 'lucide-react';
import Card from '../common/Card';
import { Exercise } from '../../types/exercise';
import { useTheme } from '../../context/ThemeContext';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

const ExerciseCard = ({ exercise, onClick }: ExerciseCardProps) => {
  const { theme } = useTheme();
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  return (
    <Card 
      hoverable 
      onClick={onClick}
      className="h-full flex flex-col transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {/* todoo: replace with the actual imgs */}
        <img 
          src={`https://images.pexels.com/photos/4162456/pexels-photo-4162456.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`}
          alt={exercise.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[exercise.difficulty]}`}>
            {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
        <p className={`text-sm mb-4 flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {exercise.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{exercise.durationInSeconds}s</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-1" />
            <span className="text-sm">
              {exercise.muscleGroups[0].charAt(0).toUpperCase() + exercise.muscleGroups[0].slice(1)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExerciseCard;