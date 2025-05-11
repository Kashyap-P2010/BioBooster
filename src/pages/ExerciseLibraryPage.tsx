import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { Exercise, MuscleGroup, DifficultyLevel, AgeGroup } from '../models/Exercise';
import { useAuth } from '../context/AuthContext';
import { getAgeGroup } from '../models/User';
import { exercises } from '../data/exercises';

const ExerciseLibraryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    muscleGroups: [] as MuscleGroup[],
    difficulty: [] as DifficultyLevel[],
    equipment: [] as string[]
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters]);

  const applyFilters = () => {
    let filtered = [...exercises];

    // Filter by age group if user is logged in
    if (currentUser) {
      const userAgeGroup = getAgeGroup(currentUser.age);
      filtered = filtered.filter(exercise => 
        exercise.ageGroups.includes(userAgeGroup as AgeGroup)
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        exercise =>
          exercise.name.toLowerCase().includes(query) ||
          exercise.description.toLowerCase().includes(query)
      );
    }

    // Apply muscle group filter
    if (filters.muscleGroups.length > 0) {
      filtered = filtered.filter(exercise =>
        exercise.muscleGroups.some(group => filters.muscleGroups.includes(group))
      );
    }

    // Apply difficulty filter
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(exercise =>
        filters.difficulty.includes(exercise.difficulty)
      );
    }

    setFilteredExercises(filtered);
  };

  const toggleMuscleGroupFilter = (group: MuscleGroup) => {
    setFilters(prev => {
      const isSelected = prev.muscleGroups.includes(group);
      return {
        ...prev,
        muscleGroups: isSelected
          ? prev.muscleGroups.filter(g => g !== group)
          : [...prev.muscleGroups, group]
      };
    });
  };

  const toggleDifficultyFilter = (difficulty: DifficultyLevel) => {
    setFilters(prev => {
      const isSelected = prev.difficulty.includes(difficulty);
      return {
        ...prev,
        difficulty: isSelected
          ? prev.difficulty.filter(d => d !== difficulty)
          : [...prev.difficulty, difficulty]
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      muscleGroups: [],
      difficulty: [],
      equipment: []
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Exercise Library</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover bodyweight exercises for your home workouts. 
            No equipment needed - just your body and determination.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input pl-10"
                placeholder="Search exercises..."
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-outline flex items-center justify-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {(filters.muscleGroups.length > 0 || filters.difficulty.length > 0) && (
                <span className="ml-2 bg-primary-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                  {filters.muscleGroups.length + filters.difficulty.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white mt-4 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-500 hover:text-primary-600"
                >
                  Clear all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Muscle Group Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Muscle Group</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(MuscleGroup).map(group => (
                      <button
                        key={group}
                        onClick={() => toggleMuscleGroupFilter(group)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.muscleGroups.includes(group)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(DifficultyLevel).map(level => (
                      <button
                        key={level}
                        onClick={() => toggleDifficultyFilter(level)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.difficulty.includes(level)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.length > 0 ? (
            filteredExercises.map(exercise => (
              <motion.div
                key={exercise.id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="exercise-item"
                onClick={() => setSelectedExercise(exercise)}
              >
                <div className="exercise-card group cursor-pointer h-full">
                  {exercise.imageUrl && (
                    <div className="h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <h3 className="font-semibold text-lg mb-1 text-gray-800">{exercise.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{exercise.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                      exercise.difficulty === DifficultyLevel.Beginner
                        ? 'bg-green-100 text-green-800'
                        : exercise.difficulty === DifficultyLevel.Intermediate
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {exercise.difficulty}
                    </span>
                    {exercise.muscleGroups.slice(0, 2).map((group, index) => (
                      <span key={index} className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center">
              <p className="text-gray-500 text-lg">
                No exercises found matching your criteria. Try adjusting your filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">{selectedExercise.name}</h2>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                {selectedExercise.imageUrl && (
                  <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
                    <img
                      src={selectedExercise.imageUrl}
                      alt={selectedExercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                    selectedExercise.difficulty === DifficultyLevel.Beginner
                      ? 'bg-green-100 text-green-800'
                      : selectedExercise.difficulty === DifficultyLevel.Intermediate
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedExercise.difficulty}
                  </span>
                  {selectedExercise.muscleGroups.map((group, index) => (
                    <span key={index} className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      {group}
                    </span>
                  ))}
                  {selectedExercise.ageGroups.map((group, index) => (
                    <span key={index} className="bg-secondary-100 text-secondary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      {group}
                    </span>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedExercise.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-2">Instructions</h3>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-600">
                    {selectedExercise.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {selectedExercise.tips && selectedExercise.tips.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Tips</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {selectedExercise.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedExercise.variations && selectedExercise.variations.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Variations</h3>
                    <div className="space-y-3">
                      {selectedExercise.variations.map((variation, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{variation.name}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                              variation.difficulty === DifficultyLevel.Beginner
                                ? 'bg-green-100 text-green-800'
                                : variation.difficulty === DifficultyLevel.Intermediate
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {variation.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{variation.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseLibraryPage;