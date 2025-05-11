import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Dumbbell, 
  Users,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { AgeGroup, getAgeGroup } from '../models/User';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    todaysWorkout, 
    workoutStats, 
    userWorkoutLogs, 
    getCurrentChallenge 
  } = useWorkout();
  
  const dashboardRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation for dashboard sections
  useEffect(() => {
    if (!dashboardRef.current) return;

    // Add dashboard entry animation class
    dashboardRef.current.classList.add('dashboard-enter-active');

    // Animate sections one by one
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  const ageGroup = getAgeGroup(currentUser.age);
  const dailyChallenge = getCurrentChallenge();
  const completedToday = userWorkoutLogs.some(
    log => new Date(log.date).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10" ref={dashboardRef}>
      <div className="container-custom">
        {/* Welcome Section */}
        <div 
          className="dashboard-section mb-8" 
          ref={el => (sectionsRef.current[0] = el)}
        >
          <div className="bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Welcome back, {currentUser.username}!
                </h1>
                <p className="text-primary-100">
                  {completedToday 
                    ? 'Great job on your workout today! Keep up the good work.' 
                    : 'Ready for today\'s workout? Your body is waiting to move!'}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                  <Activity className="w-5 h-5" />
                  <div>
                    <span className="text-sm">Current Streak</span>
                    <p className="font-bold text-lg">{currentUser.streak} days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div 
          className="dashboard-section mb-8" 
          ref={el => (sectionsRef.current[1] = el)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stats-card">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-primary-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Total Workouts</h3>
              <p className="text-2xl font-bold text-primary-500">{currentUser.completedWorkouts}</p>
            </div>
            
            <div className="stats-card">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Workout Streak</h3>
              <p className="text-2xl font-bold text-accent-500">{currentUser.streak} days</p>
            </div>
            
            <div className="stats-card">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Total Minutes</h3>
              <p className="text-2xl font-bold text-secondary-500">
                {workoutStats?.totalMinutes || 0}
              </p>
            </div>
            
            <div className="stats-card">
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Progress Level</h3>
              <p className="text-2xl font-bold text-success-500">
                {currentUser.settings.fitnessLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Today's Recommendation */}
        <div 
          className="dashboard-section mb-8" 
          ref={el => (sectionsRef.current[2] = el)}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            Today's Recommendation
          </h2>
          
          {todaysWorkout ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {todaysWorkout.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{todaysWorkout.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                        {todaysWorkout.difficulty}
                      </span>
                      <span className="bg-secondary-100 text-secondary-700 text-xs font-medium px-2.5 py-0.5 rounded">
                        {todaysWorkout.duration} min
                      </span>
                      {todaysWorkout.targetMuscleGroups.slice(0, 2).map((group, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0 hidden md:block">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Recommended for {ageGroup}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap md:items-center gap-3 mt-2">
                  <Link to={`/planner?workout=${todaysWorkout.id}`} className="btn-primary">
                    Start Workout
                  </Link>
                  <Link to="/exercises" className="btn-outline">
                    Find Another
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600">
                No workout recommendations available yet. Complete your profile to get personalized suggestions.
              </p>
              <Link to="/profile" className="btn-primary mt-4">
                Update Profile
              </Link>
            </div>
          )}
        </div>

        {/* Two-Column Layout for Challenges and Friends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Challenge */}
          <div 
            className="dashboard-section" 
            ref={el => (sectionsRef.current[3] = el)}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Daily Challenge
            </h2>
            
            {dailyChallenge ? (
              <div className="challenge-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{dailyChallenge.name}</h3>
                  <Trophy className="w-5 h-5 text-accent-500" />
                </div>
                <p className="text-gray-600 text-sm mb-3">{dailyChallenge.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium bg-accent-100 text-accent-700 px-2.5 py-0.5 rounded">
                      {dailyChallenge.difficulty}
                    </span>
                    <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded">
                      {dailyChallenge.workout.duration} min
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {dailyChallenge.participants} participants
                  </div>
                </div>
                
                <Link to="/challenges" className="btn-accent w-full">
                  Accept Challenge
                </Link>
              </div>
            ) : (
              <div className="challenge-card">
                <p className="text-gray-600">
                  No challenge available today. Check back tomorrow!
                </p>
              </div>
            )}
          </div>

          {/* Workout With Friends */}
          <div 
            className="dashboard-section" 
            ref={el => (sectionsRef.current[4] = el)}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Workout With Friends
            </h2>
            
            <div className="card p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Connect & Workout Together</h3>
                  <p className="text-gray-600 text-sm">Invite friends to join your workout sessions</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Link to="/friends" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Find Workout Partners</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/friends" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Create Group Workout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;