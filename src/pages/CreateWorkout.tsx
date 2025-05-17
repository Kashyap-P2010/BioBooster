import { motion } from 'framer-motion';
import { ArrowLeft, Check, Dumbbell, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useWorkout } from '../contexts/WorkoutContext';
import { exercises, filterExercises, getExerciseById } from '../data/exercises';
import { Exercise, Workout, WorkoutExercise } from '../types';

export default function CreateWorkout() {
  const navigate = useNavigate();
  const { addWorkout, updateWorkout, savedWorkouts } = useWorkout();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [day, setDay] = useState('');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Exercise['category'] | ''>('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [restSeconds, setRestSeconds] = useState(60);
  

  useEffect(() => {
    if (editId) {
      const workoutToEdit = savedWorkouts.find(w => w.id === editId);
      if (workoutToEdit) {
        setName(workoutToEdit.name);
        setDescription(workoutToEdit.description);
        setDay(workoutToEdit.forDay || '');
        setWorkoutExercises(workoutToEdit.exercises);
      }
    }
  }, [editId, savedWorkouts]);
  

  const filteredExercises = filterExercises(selectedCategory, undefined, searchQuery);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  

  const addExerciseToWorkout = () => {
    if (!selectedExercise) return;
    
    const newExercise: WorkoutExercise = {
      exerciseId: selectedExercise.id,
      sets,
      reps,
      restSeconds,
      completed: false
    };
    
    setWorkoutExercises([...workoutExercises, newExercise]);
    closeExerciseModal();
  };
  

  const removeExercise = (index: number) => {
    const updatedExercises = [...workoutExercises];
    updatedExercises.splice(index, 1);
    setWorkoutExercises(updatedExercises);
  };
  
  
  const closeExerciseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
    setSearchQuery('');
    setSelectedCategory('');
    setSets(3);
    setReps(10);
    setRestSeconds(60);
  };
  
 
  const saveWorkout = () => {
    if (!name.trim()) {
      alert('Please provide a workout name');
      return;
    }
    
    if (workoutExercises.length === 0) {
      alert('Please add at least one exercise to your workout');
      return;
    }
    
    const workout: Workout = {
      id: editId || generateId(),
      name,
      description,
      exercises: workoutExercises,
      createdAt: new Date().toISOString(),
      category: 'custom',
      forDay: day || undefined
    };
    
    if (editId) {
      updateWorkout(workout);
    } else {
      addWorkout(workout);
    }
    
    navigate('/workout');
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
       
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold mb-2">
            {editId ? 'Edit Workout' : 'Create New Workout'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {editId 
              ? 'Update your workout plan with exercises, sets, and reps' 
              : 'Design your own custom workout by selecting exercises and configuring sets and reps'
            }
          </p>
        </div>
        
   
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Workout Details</h2>
          
          <div className="space-y-4">
            <Input
              label="Workout Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Full Body Routine"
              fullWidth
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your workout..."
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                rows={3}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Day of Week (Optional)
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a day (optional)</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
  
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Exercises</h2>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => setShowExerciseModal(true)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Exercise
            </Button>
          </div>
          
          {workoutExercises.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <Dumbbell className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No exercises added yet
              </p>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setShowExerciseModal(true)}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Your First Exercise
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {workoutExercises.map((exercise, index) => {
                const exerciseDetails = getExerciseById(exercise.exerciseId);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                  >
                    <div className="mb-3 sm:mb-0">
                      <h3 className="font-medium">{exerciseDetails?.name || 'Unknown Exercise'}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exercise.sets} sets × {exercise.reps} reps • {exercise.restSeconds}s rest
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeExercise(index)}
                        className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                        aria-label="Remove exercise"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            variant="primary" 
            size="lg"
            onClick={saveWorkout}
          >
            {editId ? 'Update Workout' : 'Save Workout'}
          </Button>
        </div>
      </div>
      
 
      {showExerciseModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                {selectedExercise ? 'Configure Exercise' : 'Select an Exercise'}
              </h3>
              <button 
                onClick={closeExerciseModal}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-10rem)]">
              {!selectedExercise ? (
                <>
                 
                  <div className="mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search exercises..."
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedCategory === ''
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      All
                    </button>
                    {['upper-body', 'core', 'lower-body', 'full-body', 'mobility'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category as Exercise['category'])}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {filteredExercises.map((exercise) => (
                      <button
                        key={exercise.id}
                        onClick={() => setSelectedExercise(exercise)}
                        className="text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {exercise.instructions}
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  {filteredExercises.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-400">
                        No exercises found matching your search
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                
                  <div className="mb-6">
                    <h4 className="font-semibold text-lg mb-2">{selectedExercise.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {selectedExercise.instructions}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sets
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={sets}
                          onChange={(e) => setSets(parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Reps
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={reps}
                          onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rest (seconds)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="300"
                          step="5"
                          value={restSeconds}
                          onChange={(e) => setRestSeconds(parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
              <div className="flex space-x-3">
                <Button variant="outline" onClick={closeExerciseModal}>
                  Cancel
                </Button>
                {selectedExercise && (
                  <Button variant="primary" onClick={addExerciseToWorkout}>
                    <Check className="w-4 h-4 mr-1" />
                    {workoutExercises.some(e => e.exerciseId === selectedExercise.id) 
                      ? 'Update Exercise' 
                      : 'Add Exercise'
                    }
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}