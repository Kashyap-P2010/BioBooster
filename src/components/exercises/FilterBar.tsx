import { Search, Filter, X } from 'lucide-react';
import { Difficulty, MuscleGroup } from '../../types/exercise';
import { useTheme } from '../../context/ThemeContext';

interface FilterBarProps {
  onDifficultyChange: (difficulty: Difficulty | 'all') => void;
  onMuscleGroupChange: (muscleGroup: MuscleGroup | 'all') => void;
  onSearchChange: (term: string) => void;
  selectedDifficulty: Difficulty | 'all';
  selectedMuscleGroup: MuscleGroup | 'all';
  searchTerm: string;
}

const FilterBar = ({
  onDifficultyChange,
  onMuscleGroupChange,
  onSearchChange,
  selectedDifficulty,
  selectedMuscleGroup,
  searchTerm,
}: FilterBarProps) => {
  const { theme } = useTheme();
  
  const difficulties: (Difficulty | 'all')[] = ['all', 'beginner', 'intermediate', 'advanced'];
  const muscleGroups: (MuscleGroup | 'all')[] = [
    'all', 'full-body', 'abs', 'legs', 'arms', 'chest', 'back', 'shoulders'
  ];
  
  const baseButtonClasses = `
    px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
    transform hover:scale-105 active:scale-95
  `;
  
  const activeButtonClasses = theme === 'dark'
    ? 'bg-blue-600 text-white'
    : 'bg-blue-600 text-white';
  
  const inactiveButtonClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  
  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}>
     
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`
            w-full pl-10 pr-10 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors
            ${theme === 'dark' 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}
          `}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        )}
      </div>
      
      
      <div className="flex items-center mb-3">
        <Filter className="h-5 w-5 mr-2" />
        <h3 className="font-medium">Filters</h3>
      </div>
      
     
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Difficulty:</p>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`
                ${baseButtonClasses}
                ${selectedDifficulty === difficulty ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Target Area:</p>
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <button
              key={group}
              onClick={() => onMuscleGroupChange(group)}
              className={`
                ${baseButtonClasses}
                ${selectedMuscleGroup === group ? activeButtonClasses : inactiveButtonClasses}
              `}
            >
              {group === 'all' ? 'All Areas' : group.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;