import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Award, 
  PlayCircle, 
  PauseCircle,
  Dumbbell,
  ChevronDown,
  ChevronUp,
  X,
  Check
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';
import { Workout, WorkoutLog, CompletedExerciseSet } from '../models/Workout';
import { exercises } from '../data/exercises';

const WorkoutPlannerPage: React.FC = () => {
  const { getWorkoutById, workouts, completeWorkout } = useWorkout();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<CompletedExerciseSet[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [feedback, setFeedback] = useState({
    energyLevel: 3,
    difficulty: 3,
    enjoyment: 3,
    notes: ''
  });
  const [showExerciseDetail, setShowExerciseDetail] = useState<string | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const workoutId = params.get('workout');
    
    if (workoutId) {
      const workout = getWorkoutById(workoutId);
      if (workout) {
        setSelectedWorkout(workout);
       
        setCompletedExercises(
          workout.exercises.map(exercise => ({
            ...exercise,
            completed: false,
            actualReps: exercise.reps,
            actualDuration: exercise.duration
          }))
        );
      }
    }
  }, [location, getWorkoutById]);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerRunning && isWorkoutActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isWorkoutActive]);

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setIsTimerRunning(true);
    setTimer(0);
    setCurrentExerciseIndex(0);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
  };

  const handleCompleteExercise = (index: number) => {
    const updatedExercises = [...completedExercises];
    updatedExercises[index].completed = !updatedExercises[index].completed;
    setCompletedExercises(updatedExercises);
  };

  const handleUpdateReps = (index: number, reps: number) => {
    const updatedExercises = [...completedExercises];
    updatedExercises[index].actualReps = reps;
    setCompletedExercises(updatedExercises);
  };

  const handleUpdateDuration = (index: number, duration: number) => {
    const updatedExercises = [...completedExercises];
    updatedExercises[index].actualDuration = duration;
    setCompletedExercises(updatedExercises);
  };

  const handleCompleteWorkout = () => {
    if (!selectedWorkout || !currentUser) return;


    const allCompleted = completedExercises.every(exercise => exercise.completed);
    
    if (!allCompleted) {

      if (!window.confirm('Some exercises are not marked as completed. Do you still want to finish the workout?')) {
        return;
      }
    }

    const workoutLog: WorkoutLog = {
      id: '', 
      workoutId: selectedWorkout.id,
      userId: currentUser.id,
      date: new Date(),
      exercises: completedExercises,
      duration: Math.floor(timer / 60), 
      feedback: {
        energyLevel: feedback.energyLevel,
        difficulty: feedback.difficulty,
        enjoyment: feedback.enjoyment,
        notes: feedback.notes,
      },
      completed: true
    };

    completeWorkout(workoutLog);
    setShowCompletionModal(true);
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
    navigate('/dashboard');
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getExerciseName = (exerciseId: string): string => {
    const exercise = exercises.find(e => e.id === exerciseId);
    return exercise ? exercise.name : 'Unknown Exercise';
  };

  const getExerciseDetails = (exerciseId: string) => {
    return exercises.find(e => e.id === exerciseId);
  };


  if (!selectedWorkout) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Workout Planner</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a workout to get started with your daily training routine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <motion.div
                key={workout.id}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="workout-card cursor-pointer"
                onClick={() => {
                  setSelectedWorkout(workout);
        
                  setCompletedExercises(
                    workout.exercises.map(exercise => ({
                      ...exercise,
                      completed: false,
                      actualReps: exercise.reps,
                      actualDuration: exercise.duration
                    }))
                  );
                }}
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{workout.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{workout.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                    {workout.difficulty}
                  </span>
                  <span className="bg-secondary-100 text-secondary-700 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {workout.duration} min
                  </span>
                  {workout.targetMuscleGroups.slice(0, 2).map((group, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      {group}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Exercises:</strong> {workout.exercises.length}
                </div>
                
                <button className="btn-primary w-full">
                  Select Workout
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        {!isWorkoutActive ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary-500 p-6 text-white">
                <h1 className="text-2xl font-bold">{selectedWorkout.name}</h1>
                <p className="text-primary-100 mt-1">{selectedWorkout.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {selectedWorkout.duration} min
                  </span>
                  <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                    {selectedWorkout.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Exercises</h2>
                
                <ul className="space-y-3 mb-6">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <li 
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{getExerciseName(exercise.exerciseId)}</span>
                        <span className="text-sm text-gray-600">
                          {exercise.sets} × {exercise.reps || (exercise.duration ? `${exercise.duration}s` : '')}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-center">
                  <button 
                    onClick={startWorkout}
                    className="btn-primary px-8 py-3 flex items-center"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="bg-primary-500 p-4 text-white flex justify-between items-center">
                <h1 className="text-xl font-bold">{selectedWorkout.name}</h1>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-white flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatTime(timer)}</span>
                  </div>
                  <button 
                    onClick={isTimerRunning ? pauseTimer : resumeTimer}
                    className="bg-white/20 p-1 rounded-full"
                  >
                    {isTimerRunning ? 
                      <PauseCircle className="w-6 h-6" /> : 
                      <PlayCircle className="w-6 h-6" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Exercises</h2>
                
                <ul className="space-y-3 mb-6">
                  {completedExercises.map((exercise, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg overflow-hidden ${
                        exercise.completed ? 'border-green-300 bg-green-50' : 'border-gray-300'
                      }`}
                    >
                      <div 
                        className="p-3 cursor-pointer"
                        onClick={() => setShowExerciseDetail(exercise.exerciseId === showExerciseDetail ? null : exercise.exerciseId)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCompleteExercise(index);
                              }}
                              className={`mr-3 flex-shrink-0 ${
                                exercise.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'
                              }`}
                            >
                              <CheckCircle className="w-6 h-6" />
                            </button>
                            <div>
                              <span className="font-medium">{getExerciseName(exercise.exerciseId)}</span>
                              <div className="text-sm text-gray-600">
                                {exercise.sets} sets × {exercise.reps || (exercise.duration ? `${exercise.duration}s` : '')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {exercise.completed && (
                              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full mr-2">
                                Completed
                              </span>
                            )}
                            {exercise.exerciseId === showExerciseDetail ? 
                              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            }
                          </div>
                        </div>
                      </div>
                      
                   
                      {exercise.exerciseId === showExerciseDetail && (
                        <div className="border-t border-gray-200 p-3 bg-gray-50">
                          <div className="mb-3">
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Exercise Details</h4>
                            {getExerciseDetails(exercise.exerciseId)?.instructions.slice(0, 3).map((instruction, i) => (
                              <p key={i} className="text-sm text-gray-600 mb-1">{i+1}. {instruction}</p>
                            ))}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 mb-2">Track Your Progress</h4>
                            <div className="flex flex-col sm:flex-row gap-3">
                              
                              {exercise.reps > 0 && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Actual Reps</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={exercise.actualReps || 0}
                                    onChange={(e) => handleUpdateReps(index, parseInt(e.target.value) || 0)}
                                    className="form-input py-1 px-2 text-sm w-full sm:w-24"
                                  />
                                </div>
                              )}
                              
                   
                              {exercise.duration && (
                                <div>
                                  <label className="block text-xs text-gray-600 mb-1">Actual Duration (s)</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={exercise.actualDuration || 0}
                                    onChange={(e) => handleUpdateDuration(index, parseInt(e.target.value) || 0)}
                                    className="form-input py-1 px-2 text-sm w-full sm:w-24"
                                  />
                                </div>
                              )}
                              
                              <div className="sm:ml-auto mt-2 sm:mt-0">
                                <button
                                  onClick={() => handleCompleteExercise(index)}
                                  className={`btn ${
                                    exercise.completed ? 'btn-outline' : 'btn-primary'
                                  } py-1 px-3 text-sm`}
                                >
                                  {exercise.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.li>
                  ))}
                </ul>
                
                <div className="flex justify-center">
                  <button 
                    onClick={handleCompleteWorkout}
                    className="btn-primary px-8 py-3 flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Workout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

  
        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Workout Complete!</h2>
                <p className="text-gray-600 mb-6">
                  Congratulations on completing your workout! You've earned a streak point.
                </p>
                <div className="flex flex-col md:flex-row gap-3 justify-center">
                  <button 
                    onClick={handleCloseCompletionModal}
                    className="btn-primary px-6 py-2"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutPlannerPage;