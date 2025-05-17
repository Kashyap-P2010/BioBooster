import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Award, TrendingUp, Calendar, Settings, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { FitnessGoal, FitnessLevel } from '../models/User';

const ProfilePage: React.FC = () => {
  const { currentUser, updateUserSettings, logout } = useAuth();
  const { workoutStats } = useWorkout();
  const [isEditMode, setIsEditMode] = useState(false);
  const [settings, setSettings] = useState({
    fitnessLevel: FitnessLevel.Beginner,
    fitnessGoals: [] as FitnessGoal[],
    workoutReminders: true,
    workoutDays: [1, 3, 5], 
    preferredWorkoutDuration: 30
  });

  useEffect(() => {
    if (currentUser) {
      setSettings(currentUser.settings);
    }
  }, [currentUser]);

  const handleSaveSettings = () => {
    updateUserSettings(settings);
    setIsEditMode(false);
  };

  const toggleFitnessGoal = (goal: FitnessGoal) => {
    if (settings.fitnessGoals.includes(goal)) {
      setSettings({
        ...settings,
        fitnessGoals: settings.fitnessGoals.filter(g => g !== goal)
      });
    } else {
      setSettings({
        ...settings,
        fitnessGoals: [...settings.fitnessGoals, goal]
      });
    }
  };

  const toggleWorkoutDay = (day: number) => {
    if (settings.workoutDays.includes(day)) {
      setSettings({
        ...settings,
        workoutDays: settings.workoutDays.filter(d => d !== day)
      });
    } else {
      setSettings({
        ...settings,
        workoutDays: [...settings.workoutDays, day].sort()
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row gap-8">
          {}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary-500 p-6 text-white">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <User className="w-12 h-12 text-primary-500" />
                  </div>
                </div>
                <h1 className="text-xl font-bold text-center">{currentUser.username}</h1>
                <p className="text-center text-primary-100">Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Age</span>
                  <span className="font-medium">{currentUser.age} years</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Fitness Level</span>
                  <span className="font-medium capitalize">{currentUser.settings.fitnessLevel}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Completed Workouts</span>
                  <span className="font-medium">{currentUser.completedWorkouts}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-medium">{currentUser.streak} days</span>
                </div>
              </div>
            </div>
            
            {}
            {workoutStats && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary-500" />
                    Your Stats
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Workouts</span>
                      <span className="font-medium">{workoutStats.totalWorkouts}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Minutes</span>
                      <span className="font-medium">{workoutStats.totalMinutes}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Exercises</span>
                      <span className="font-medium">{workoutStats.totalExercises}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Longest Streak</span>
                      <span className="font-medium">{workoutStats.longestStreak} days</span>
                    </div>
                    
                    {workoutStats.favoriteExercise && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Favorite Exercise</span>
                        <span className="font-medium">{workoutStats.favoriteExercise.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {}
            <div className="mt-6">
              <button
                onClick={logout}
                className="btn-outline w-full"
              >
                Logout
              </button>
            </div>
          </div>

          {}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-primary-500" />
                    Profile Settings
                  </h2>
                  
                  {isEditMode ? (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSaveSettings}
                        className="p-2 text-primary-500 hover:text-primary-600"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="btn-outline py-1 px-3 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditMode ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-800">Fitness Level</h3>
                      <div className="space-y-2">
                        {Object.values(FitnessLevel).map((level) => (
                          <label key={level} className="flex items-center">
                            <input
                              type="radio"
                              name="fitnessLevel"
                              checked={settings.fitnessLevel === level}
                              onChange={() => setSettings({...settings, fitnessLevel: level})}
                              className="mr-2"
                            />
                            <span className="capitalize">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-800">Fitness Goals</h3>
                      <div className="space-y-2">
                        {Object.values(FitnessGoal).map((goal) => (
                          <label key={goal} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={settings.fitnessGoals.includes(goal)}
                              onChange={() => toggleFitnessGoal(goal)}
                              className="mr-2"
                            />
                            <span>{goal}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-800">Preferred Workout Days</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleWorkoutDay(index)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              settings.workoutDays.includes(index)
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {day.charAt(0)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-800">
                        Preferred Workout Duration: {settings.preferredWorkoutDuration} minutes
                      </h3>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        step="5"
                        value={settings.preferredWorkoutDuration}
                        onChange={(e) => setSettings({...settings, preferredWorkoutDuration: parseInt(e.target.value)})}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>10 min</span>
                        <span>60 min</span>
                      </div>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-2 text-gray-800">Notifications</h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.workoutReminders}
                          onChange={() => setSettings({...settings, workoutReminders: !settings.workoutReminders})}
                          className="mr-2"
                        />
                        <span>Enable workout reminders</span>
                      </label>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-1 text-gray-800">Fitness Level</h3>
                      <p className="text-gray-600 capitalize">{settings.fitnessLevel}</p>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-1 text-gray-800">Fitness Goals</h3>
                      {settings.fitnessGoals.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {settings.fitnessGoals.map(goal => (
                            <span key={goal} className="bg-primary-100 text-primary-700 text-sm px-2 py-0.5 rounded">
                              {goal}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">No fitness goals selected</p>
                      )}
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-1 text-gray-800">Preferred Workout Days</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <span
                            key={day}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              settings.workoutDays.includes(index)
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {day.charAt(0)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-1 text-gray-800">Preferred Workout Duration</h3>
                      <p className="text-gray-600">{settings.preferredWorkoutDuration} minutes</p>
                    </div>
                    
                    {}
                    <div>
                      <h3 className="text-md font-medium mb-1 text-gray-800">Notifications</h3>
                      <p className="text-gray-600">
                        Workout reminders: {settings.workoutReminders ? 'Enabled' : 'Disabled'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                  Workout Activity
                </h2>
                
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 30 }, (_, i) => {
                    
                    const intensity = Math.floor(Math.random() * 4); 
                    return (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded ${
                          intensity === 0
                            ? 'bg-gray-100'
                            : intensity === 1
                            ? 'bg-primary-200'
                            : intensity === 2
                            ? 'bg-primary-400'
                            : 'bg-primary-600'
                        }`}
                        title={`Day ${i + 1}: ${
                          intensity === 0 ? 'No workout' : `Workout (${intensity} exercises)`
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-end mt-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="w-3 h-3 bg-gray-100 rounded mr-1"></span>
                    <span className="mr-2">None</span>
                    <span className="w-3 h-3 bg-primary-200 rounded mr-1"></span>
                    <span className="mr-2">Light</span>
                    <span className="w-3 h-3 bg-primary-400 rounded mr-1"></span>
                    <span className="mr-2">Medium</span>
                    <span className="w-3 h-3 bg-primary-600 rounded mr-1"></span>
                    <span>Intense</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;