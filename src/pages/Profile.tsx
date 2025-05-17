import { motion } from 'framer-motion';
import { Award, Calendar, Edit2, FlameIcon, User } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { useUser } from '../contexts/UserContext';
import { getExerciseById } from '../data/exercises';

export default function Profile() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [fitnessLevel, setFitnessLevel] = useState(user?.fitnessLevel || 'beginner');
  const [goal, setGoal] = useState(user?.goal || '');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    updateUser({
      ...user,
      name,
      fitnessLevel: fitnessLevel as 'beginner' | 'intermediate' | 'advanced',
      goal
    });
    
    setIsEditing(false);
  };
  

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Set up your profile to track your workout progress and maintain your streak.
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                fullWidth
                required
                className="mb-4"
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fitness Level
                </label>
                <select
                  value={fitnessLevel}
                  onChange={(e) => setFitnessLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <Input
                label="Fitness Goal (Optional)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Lose weight, build muscle, increase endurance"
                fullWidth
              />
              
              <Button type="submit" variant="primary" isFullWidth className="mt-4">
                Create Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const totalWorkouts = user.workoutHistory.length;
  const totalMinutes = user.workoutHistory.reduce((acc, workout) => acc + workout.duration, 0);
  const exerciseCount = new Set(
    user.workoutHistory.flatMap(workout => workout.exercises.map(ex => ex.exerciseId))
  ).size;
  

  const recentWorkouts = [...user.workoutHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
   
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          {!isEditing ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      {fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} • {goal || 'No goal set'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-6">
                  <div className="flex items-center">
                    <FlameIcon className="w-5 h-5 text-orange-500 mr-1.5" />
                    <span className="font-bold text-xl">{user.streakCount}</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <Input
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Fitness Level
                    </label>
                    <select
                      value={fitnessLevel}
                      onChange={(e) => setFitnessLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Fitness Goal (Optional)"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., Lose weight, build muscle, increase endurance"
                    fullWidth
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" variant="primary">Save Changes</Button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
        
   
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Workouts</div>
          </Card>
          
          <Card className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div className="text-2xl font-bold">{totalMinutes}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Minutes</div>
          </Card>
          
          <Card className="p-4 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900 flex items-center justify-center mb-3">
              <User className="w-6 h-6 text-accent-600 dark:text-accent-400" />
            </div>
            <div className="text-2xl font-bold">{exerciseCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Different Exercises</div>
          </Card>
        </motion.div>
        
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
          
          {recentWorkouts.length > 0 ? (
            <div className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-medium">{workout.workoutName}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(workout.date)} • {workout.duration} minutes
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {workout.exercises.slice(0, 3).map((ex, i) => {
                        const exercise = getExerciseById(ex.exerciseId);
                        return exercise ? (
                          <span key={i} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                            {exercise.name}
                          </span>
                        ) : null;
                      })}
                      {workout.exercises.length > 3 && (
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded">
                          +{workout.exercises.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-600 dark:text-gray-400">
                You haven't completed any workouts yet.
              </p>
              <Button variant="primary" className="mt-4">
                Start Your First Workout
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}