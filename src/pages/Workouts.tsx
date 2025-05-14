import { useState } from 'react';
import Layout from '../components/common/Layout';
import WorkoutGenerator from '../components/workouts/WorkoutGenerator';
import PresetWorkoutList from '../components/workouts/PresetWorkoutList';
import WorkoutSession from '../components/workouts/WorkoutSession';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { WorkoutPreferences, Workout } from '../types/workout';
import { generateWorkout } from '../utils/workoutUtils';
import { getExerciseById } from '../data/exercises';
import { Clock, Play, ChevronRight, Dumbbell, Zap } from 'lucide-react';

const Workouts = () => {
  const { theme } = useTheme();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isInSession, setIsInSession] = useState(false);
  const [activeTab, setActiveTab] = useState<'preset' | 'generate'>('preset');
  
  const handleGenerateWorkout = (preferences: WorkoutPreferences) => {
    const generatedWorkout = generateWorkout(preferences);
    setWorkout(generatedWorkout);
    
    setTimeout(() => {
      document.getElementById('workout-result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  const handleStartWorkout = (selectedWorkout: Workout) => {
    setWorkout(selectedWorkout);
    setIsInSession(true);
  };
  
  const handleCompleteWorkout = () => {
    // Here you would typically save the workout progress
    setIsInSession(false);
    setWorkout(null);
  };
  
  const handleExitWorkout = () => {
    setIsInSession(false);
    setWorkout(null);
  };
  
  if (isInSession && workout) {
    return (
      <Layout>
        <div className="container mx-auto px-4 pt-24 pb-12">
          <WorkoutSession
            workout={workout}
            onComplete={handleCompleteWorkout}
            onExit={handleExitWorkout}
          />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Workouts</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose from our pre-made workouts or create your own customized routine.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === 'preset' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('preset')}
            className="flex items-center"
          >
            <Dumbbell className="h-5 w-5 mr-2" />
            Pre-made Workouts
          </Button>
          <Button
            variant={activeTab === 'generate' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('generate')}
            className="flex items-center"
          >
            <Zap className="h-5 w-5 mr-2" />
            Generate Workout
          </Button>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {activeTab === 'generate' ? (
            <>
              {/* Generator Form */}
              <div className="lg:col-span-4">
                <WorkoutGenerator onGenerateWorkout={handleGenerateWorkout} />
              </div>
              
              {/* Workout Result */}
              <div className="lg:col-span-8" id="workout-result">
                {workout ? (
                  <div className="animate-fade-in">
                    <Card className="p-6 mb-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold">{workout.name}</h2>
                          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                            {workout.description}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-bold">{workout.duration} min</span>
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {workout.targetMuscleGroups.map(group => (
                          <span 
                            key={group}
                            className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${theme === 'dark' 
                                ? 'bg-blue-900 text-blue-200' 
                                : 'bg-blue-100 text-blue-800'}
                            `}
                          >
                            {group.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        ))}
                      </div>
                      
                      <Button 
                        variant="primary" 
                        size="lg" 
                        fullWidth
                        onClick={() => handleStartWorkout(workout)}
                        className="mb-6 flex items-center justify-center transform transition-transform hover:scale-105"
                      >
                        <Play className="h-5 w-5 mr-2" /> Start Workout
                      </Button>
                      
                      {/* Exercises */}
                      <div>
                        <h3 className="font-semibold mb-4">Exercises</h3>
                        <div className="space-y-4">
                          {workout.exercises.map((item, index) => {
                            const exercise = getExerciseById(item.exerciseId);
                            if (!exercise) return null;
                            
                            return (
                              <div 
                                key={`${item.exerciseId}-${index}`}
                                className={`
                                  p-4 rounded-lg flex items-center transition-all hover:shadow-md
                                  ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-100 hover:bg-gray-200'}
                                `}
                              >
                                <div className="mr-4 w-16 h-16 rounded-md overflow-hidden">
                                  <img 
                                    src={`https://images.pexels.com/photos/4162456/pexels-photo-4162456.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop`}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{exercise.name}</h4>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {item.sets} sets × {item.reps} reps
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-medium flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {item.durationInSeconds}s
                                  </span>
                                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Rest: {item.restAfterInSeconds}s
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <Card className="p-6 flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <p className="text-xl font-medium mb-2">Your Workout Will Appear Here</p>
                      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                        Use the generator to create a personalized workout
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </>
          ) : (
            <div className="lg:col-span-12">
              <PresetWorkoutList onSelectWorkout={handleStartWorkout} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Workouts;