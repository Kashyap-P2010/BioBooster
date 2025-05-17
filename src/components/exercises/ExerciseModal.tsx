import { Clock, X, ChevronRight } from 'lucide-react';
import { Exercise } from '../../types/exercise';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

interface ExerciseModalProps {
  exercise: Exercise;
  onClose: () => void;
}

const ExerciseModal = ({ exercise, onClose }: ExerciseModalProps) => {
  const { theme } = useTheme();
  
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div 
        className={`
          w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl
          transform transition-all duration-300 animate-fade-in
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}
        `}
      >
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="h-64 overflow-hidden">
            {/* TODO: Replace with real images later */}
            <img 
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{exercise.name}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                {exercise.muscleGroups.map(group => (
                  <span 
                    key={group}
                    className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}
                    `}
                  >
                    {group.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                ))}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[exercise.difficulty]}`}>
                  {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                </span>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {exercise.description}
              </p>
            </div>
            <div className={`
              flex items-center px-4 py-2 rounded-lg
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
            `}>
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">{exercise.durationInSeconds} seconds</span>
            </div>
          </div>
          
        
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Instructions</h3>
            <ol className="space-y-3">
              {exercise.instructions.map((instruction, index) => (
                <li 
                  key={index}
                  className={`
                    flex items-start
                    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}
                  `}
                >
                  <span className={`
                    inline-flex items-center justify-center h-6 w-6 rounded-full mr-3 flex-shrink-0
                    ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}
                  `}>
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          
          
          {exercise.modifications && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Modifications</h3>
              <div className={`
                rounded-lg p-4
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
              `}>
                {exercise.modifications.easier && (
                  <div className="mb-2">
                    <span className="font-medium">Easier: </span>
                    <span>{exercise.modifications.easier}</span>
                  </div>
                )}
                {exercise.modifications.harder && (
                  <div>
                    <span className="font-medium">Harder: </span>
                    <span>{exercise.modifications.harder}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              variant="primary"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Add to Workout
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={onClose}
              className="flex-1"
            >
              Watch Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;