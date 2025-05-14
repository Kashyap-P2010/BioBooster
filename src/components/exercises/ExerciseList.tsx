import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import FilterBar from './FilterBar';
import { Exercise, Difficulty, MuscleGroup } from '../../types/exercise';
import { exercises } from '../../data/exercises';
import ExerciseModal from './ExerciseModal';

const ExerciseList = () => {
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  
  useEffect(() => {
    let result = [...exercises];
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      result = result.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    // Filter by muscle group
    if (selectedMuscleGroup !== 'all') {
      result = result.filter(ex => ex.muscleGroups.includes(selectedMuscleGroup));
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(ex => 
        ex.name.toLowerCase().includes(term) || 
        ex.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredExercises(result);
  }, [selectedDifficulty, selectedMuscleGroup, searchTerm]);
  
  const handleDifficultyChange = (difficulty: Difficulty | 'all') => {
    setSelectedDifficulty(difficulty);
  };
  
  const handleMuscleGroupChange = (muscleGroup: MuscleGroup | 'all') => {
    setSelectedMuscleGroup(muscleGroup);
  };
  
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };
  
  return (
    <div>
      <FilterBar 
        onDifficultyChange={handleDifficultyChange}
        onMuscleGroupChange={handleMuscleGroupChange}
        onSearchChange={handleSearchChange}
        selectedDifficulty={selectedDifficulty}
        selectedMuscleGroup={selectedMuscleGroup}
        searchTerm={searchTerm}
      />
      
      <div className="mt-8 animate-fade-in">
        {filteredExercises.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl">No exercises found matching your criteria.</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExercises.map(exercise => (
              <ExerciseCard 
                key={exercise.id} 
                exercise={exercise} 
                onClick={() => setSelectedExercise(exercise)}
              />
            ))}
          </div>
        )}
      </div>
      
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
};

export default ExerciseList;