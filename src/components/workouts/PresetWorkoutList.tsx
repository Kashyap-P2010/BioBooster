import { useState } from 'react';
import { presetWorkouts } from '../../data/workouts';
import Card from '../common/Card';
import Button from '../common/Button';
import { Clock, BarChart2, Play } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Workout } from '../../types/workout';

interface PresetWorkoutListProps {
  onSelectWorkout: (workout: Workout) => void;
}

const PresetWorkoutList = ({ onSelectWorkout }: PresetWorkoutListProps) => {
  const { theme } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  const filteredWorkouts = selectedDifficulty === 'all'
    ? presetWorkouts
    : presetWorkouts.filter(workout => workout.difficulty === selectedDifficulty);
  
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(difficulty => (
          <Button
            key={difficulty}
            variant={selectedDifficulty === difficulty ? 'primary' : 'outline'}
            onClick={() => setSelectedDifficulty(difficulty)}
            size="sm"
          >
            {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map(workout => (
          <Card
            key={workout.id}
            hoverable
            className="overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={workout.imageUrl}
                alt={workout.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}
                `}>
                  {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {workout.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">{workout.duration} min</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {workout.targetMuscleGroups.map(group => 
                      group.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                    ).join(', ')}
                  </span>
                </div>
              </div>
              
              <Button
                variant="primary"
                fullWidth
                onClick={() => onSelectWorkout(workout)}
                className="flex items-center justify-center"
              >
                <Play className="h-4 w-4 mr-2" /> Start Workout
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PresetWorkoutList;