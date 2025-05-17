import { useState } from 'react';
import { Clock, BarChart2, Users } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { 
  WorkoutPreferences, 
  WorkoutDuration, 
} from '../../types/workout';
import { Difficulty, AgeGroup, MuscleGroup } from '../../types/exercise';
import { useTheme } from '../../context/ThemeContext';

interface WorkoutGeneratorProps {
  onGenerateWorkout: (preferences: WorkoutPreferences) => void;
}

const WorkoutGenerator = ({ onGenerateWorkout }: WorkoutGeneratorProps) => {
  const { theme } = useTheme();
  
  const [preferences, setPreferences] = useState<WorkoutPreferences>({
    duration: 20,
    difficulty: 'beginner',
    ageGroup: 'adult',
    targetMuscleGroups: ['full-body'],
  });
  
  const durations: WorkoutDuration[] = [5, 10, 20, 30, 45];
  const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
  const ageGroups: AgeGroup[] = ['teen', 'adult', 'senior'];
  const muscleGroups: MuscleGroup[] = ['full-body', 'abs', 'legs', 'arms', 'chest', 'back', 'shoulders'];
  
  const handleDurationChange = (duration: WorkoutDuration) => {
    setPreferences(prev => ({ ...prev, duration }));
  };
  
  const handleDifficultyChange = (difficulty: Difficulty) => {
    setPreferences(prev => ({ ...prev, difficulty }));
  };
  
  const handleAgeGroupChange = (ageGroup: AgeGroup) => {
    setPreferences(prev => ({ ...prev, ageGroup }));
  };
  
  const handleMuscleGroupChange = (muscleGroup: MuscleGroup) => {
    setPreferences(prev => {
      
      if (muscleGroup === 'full-body') {
        return { ...prev, targetMuscleGroups: ['full-body'] };
      }
      
      
      const updatedGroups = prev.targetMuscleGroups.filter(g => g !== 'full-body');
      
      
      if (updatedGroups.includes(muscleGroup)) {
        return { 
          ...prev, 
          targetMuscleGroups: updatedGroups.filter(g => g !== muscleGroup)
        };
      } else {
        return { 
          ...prev, 
          targetMuscleGroups: [...updatedGroups, muscleGroup]
        };
      }
    });
  };
  
  const handleGenerateClick = () => {
    onGenerateWorkout(preferences);
  };
  
  const baseButtonClasses = `
    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 mb-2 mr-2
    transform hover:scale-105 active:scale-95
  `;
  
  const activeButtonClasses = theme === 'dark'
    ? 'bg-blue-600 text-white'
    : 'bg-blue-600 text-white';
  
  const inactiveButtonClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  
  const OptionLabel = ({ icon, text }: { icon: JSX.Element, text: string }) => (
    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
      {icon}
      <span className="ml-2 text-sm font-medium">{text}</span>
    </div>
  );
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Customize Your Workout</h2>
      
    
      <div className="mb-6">
        <OptionLabel icon={<Clock className="h-4 w-4" />} text="Workout Duration" />
        <div className="flex flex-wrap">
          {durations.map(duration => (
            <button
              key={duration}
              onClick={() => handleDurationChange(duration)}
              className={`
                ${baseButtonClasses}
                ${preferences.duration === duration ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {duration} min
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <OptionLabel icon={<BarChart2 className="h-4 w-4" />} text="Difficulty Level" />
        <div className="flex flex-wrap">
          {difficulties.map(difficulty => (
            <button
              key={difficulty}
              onClick={() => handleDifficultyChange(difficulty)}
              className={`
                ${baseButtonClasses}
                ${preferences.difficulty === difficulty ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
 
      <div className="mb-6">
        <OptionLabel icon={<Users className="h-4 w-4" />} text="Age Group" />
        <div className="flex flex-wrap">
          {ageGroups.map(ageGroup => (
            <button
              key={ageGroup}
              onClick={() => handleAgeGroupChange(ageGroup)}
              className={`
                ${baseButtonClasses}
                ${preferences.ageGroup === ageGroup ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <OptionLabel icon={<BarChart2 className="h-4 w-4" />} text="Target Area" />
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Select multiple to target specific areas, or choose Full Body
        </p>
        <div className="flex flex-wrap">
          {muscleGroups.map(muscleGroup => (
            <button
              key={muscleGroup}
              onClick={() => handleMuscleGroupChange(muscleGroup)}
              className={`
                ${baseButtonClasses}
                ${preferences.targetMuscleGroups.includes(muscleGroup) ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {muscleGroup.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>
      
 
      <Button 
        variant="primary" 
        size="lg" 
        fullWidth
        onClick={handleGenerateClick}
        className="transform transition-transform hover:scale-105 active:scale-95"
      >
        Generate Workout
      </Button>
    </Card>
  );
};

export default WorkoutGenerator;