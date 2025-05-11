import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';
import { DailyChallenge } from '../models/Workout';
import { exercises } from '../data/exercises';

const ChallengesPage: React.FC = () => {
  const { dailyChallenges, userWorkoutLogs, getCurrentChallenge } = useWorkout();
  const { currentUser } = useAuth();
  const [expandedChallenge, setExpandedChallenge] = useState<string | null>(null);

  // Check if the user has completed the current challenge
  const currentChallenge = getCurrentChallenge();
  const hasCompletedToday = userWorkoutLogs.some(
    log => 
      new Date(log.date).toDateString() === new Date().toDateString() &&
      log.workoutId === currentChallenge?.workout.id
  );

  const toggleExpandChallenge = (challengeId: string) => {
    if (expandedChallenge === challengeId) {
      setExpandedChallenge(null);
    } else {
      setExpandedChallenge(challengeId);
    }
  };

  const getExerciseName = (exerciseId: string): string => {
    const exercise = exercises.find(e => e.id === exerciseId);
    return exercise ? exercise.name : 'Unknown Exercise';
  };

  // Sort challenges: current challenge first, then by date (newest to oldest)
  const sortedChallenges = [...dailyChallenges].sort((a, b) => {
    // Current challenge is always first
    if (currentChallenge) {
      if (a.id === currentChallenge.id) return -1;
      if (b.id === currentChallenge.id) return 1;
    }
    
    // Otherwise sort by date (newest first)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Daily Challenges</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Push your limits with our daily workout challenges. Complete them to earn rewards and climb the leaderboard!
          </p>
        </div>

        {/* Current Challenge Highlight */}
        {currentChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-accent-500 to-accent-400 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Trophy className="w-6 h-6 mr-2" />
                      <h2 className="text-2xl font-bold">Today's Challenge</h2>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{currentChallenge.name}</h3>
                    <p className="text-accent-50 mb-4">{currentChallenge.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                        {currentChallenge.difficulty}
                      </span>
                      <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                        {currentChallenge.workout.duration} min
                      </span>
                      <span className="bg-white/20 text-white text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                        <Users className="w-3 h-3 mr-1" /> {currentChallenge.participants} participants
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-white/10 p-4 rounded-lg text-center mb-4 md:mb-0">
                      <p className="text-accent-50 text-sm mb-1">Challenge Rewards</p>
                      <div className="flex items-center justify-center gap-2">
                        <Award className="w-5 h-5" />
                        <span className="font-bold">{currentChallenge.rewards.streakPoints} streak points</span>
                      </div>
                      {currentChallenge.rewards.badges && (
                        <div className="mt-2 flex flex-wrap justify-center gap-1">
                          {currentChallenge.rewards.badges.map((badge, index) => (
                            <span key={index} className="bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  {hasCompletedToday ? (
                    <div className="bg-white/20 py-2 px-4 rounded-lg text-center">
                      <p className="font-medium flex items-center justify-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        You've completed today's challenge!
                      </p>
                    </div>
                  ) : (
                    <Link 
                      to={`/planner?workout=${currentChallenge.workout.id}`}
                      className="btn bg-white text-accent-600 hover:bg-accent-50 w-full md:w-auto"
                    >
                      Accept Challenge
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Expandable Workout Preview */}
              <div className="bg-white p-4 cursor-pointer" onClick={() => toggleExpandChallenge(currentChallenge.id)}>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Workout Preview</span>
                  {expandedChallenge === currentChallenge.id ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </div>
                
                {expandedChallenge === currentChallenge.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3"
                  >
                    <ul className="space-y-2">
                      {currentChallenge.workout.exercises.map((exercise, index) => (
                        <li key={index} className="bg-gray-50 p-2 rounded">
                          <div className="flex justify-between items-center">
                            <span>{getExerciseName(exercise.exerciseId)}</span>
                            <span className="text-sm text-gray-600">
                              {exercise.sets} × {exercise.reps || (exercise.duration ? `${exercise.duration}s` : '')}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Past Challenges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Past Challenges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedChallenges
              .filter(challenge => challenge.id !== currentChallenge?.id)
              .map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="challenge-card"
                >
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">{challenge.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span>
                        {new Date(challenge.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{challenge.participants} participants</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                        {challenge.difficulty}
                      </span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                        {challenge.workout.duration} min
                      </span>
                    </div>
                    
                    {/* Workout Preview Toggle */}
                    <div 
                      className="flex justify-between items-center cursor-pointer py-2 hover:bg-gray-50 rounded px-2 transition-colors"
                      onClick={() => toggleExpandChallenge(challenge.id)}
                    >
                      <span className="font-medium text-gray-700">Workout Details</span>
                      {expandedChallenge === challenge.id ? 
                        <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      }
                    </div>
                    
                    {expandedChallenge === challenge.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3"
                      >
                        <ul className="space-y-2">
                          {challenge.workout.exercises.map((exercise, index) => (
                            <li key={index} className="bg-gray-50 p-2 rounded">
                              <div className="flex justify-between items-center">
                                <span>{getExerciseName(exercise.exerciseId)}</span>
                                <span className="text-sm text-gray-600">
                                  {exercise.sets} × {exercise.reps || (exercise.duration ? `${exercise.duration}s` : '')}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;

