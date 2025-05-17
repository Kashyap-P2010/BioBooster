import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ExerciseCard from '../components/ui/ExerciseCard';
import { Exercise } from '../types';
import { exercises } from '../data/exercises';

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Exercise['category'] | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Exercise['difficulty'] | ''>('');
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
  const [showFilters, setShowFilters] = useState(false);
  

  useEffect(() => {
    let filtered = [...exercises];
    

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exercise => 
        exercise.name.toLowerCase().includes(query) ||
        exercise.instructions.toLowerCase().includes(query) ||
        exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(query))
      );
    }
    

    if (selectedCategory) {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }
    

    if (selectedDifficulty) {
      filtered = filtered.filter(exercise => exercise.difficulty === selectedDifficulty);
    }
    
    setFilteredExercises(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);
  

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setFilteredExercises(exercises);
  };
  

  const categories = [
    { value: 'upper-body', label: 'Upper Body' },
    { value: 'core', label: 'Core' },
    { value: 'lower-body', label: 'Lower Body' },
    { value: 'full-body', label: 'Full Body' },
    { value: 'mobility', label: 'Mobility' },
  ];
  

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Exercise Library</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse our collection of exercises or use the search and filters to find specific ones.
        </p>
      </motion.div>
      

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
 
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Clear search"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
              </button>
            )}
          </div>
          
         
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2"
            >
              <Filter className="h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
        
          <div className="hidden md:flex items-center gap-4">
        
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Exercise['category'] | '')}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            
 
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as Exercise['difficulty'] | '')}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Difficulties</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
            
    
            {(selectedCategory || selectedDifficulty || searchQuery) && (
              <button
                onClick={resetFilters}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Reset
              </button>
            )}
          </div>
        </div>
        

        {showFilters && (
          <motion.div 
            className="md:hidden mt-4 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as Exercise['category'] | '')}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as Exercise['difficulty'] | '')}
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Difficulties</option>
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>

              {(selectedCategory || selectedDifficulty || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="w-full mt-2 text-center text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center gap-1 py-2"
                >
                  <X className="h-4 w-4" />
                  Reset All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
        

        {(selectedCategory || selectedDifficulty) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategory && (
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-sm rounded-full px-3 py-1 flex items-center">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory('')}
                  className="ml-1.5"
                  aria-label={`Remove ${selectedCategory} filter`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            
            {selectedDifficulty && (
              <div className="bg-secondary-100 dark:bg-secondary-900 text-secondary-800 dark:text-secondary-300 text-sm rounded-full px-3 py-1 flex items-center">
                {difficulties.find(d => d.value === selectedDifficulty)?.label}
                <button
                  onClick={() => setSelectedDifficulty('')}
                  className="ml-1.5"
                  aria-label={`Remove ${selectedDifficulty} filter`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      

      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredExercises.length} {filteredExercises.length === 1 ? 'exercise' : 'exercises'}
        </p>
      </div>
      

      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 inline-block mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No exercises found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}