import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Workout, WorkoutLog, WorkoutStats, DailyChallenge, FriendWorkout } from '../models/Workout';
import { useAuth } from './AuthContext';
import { workouts as initialWorkouts, dailyChallenges as initialChallenges } from '../data/workouts';
import { AgeGroup, DifficultyLevel } from '../models/Exercise';
import { getAgeGroup } from '../models/User';

interface WorkoutContextType {
  workouts: Workout[];
  userWorkoutLogs: WorkoutLog[];
  dailyChallenges: DailyChallenge[];
  friendWorkouts: FriendWorkout[];
  workoutStats: WorkoutStats | null;
  todaysWorkout: Workout | null;
  getWorkoutById: (id: string) => Workout | undefined;
  completeWorkout: (workoutLog: WorkoutLog) => void;
  getRecommendedWorkouts: () => Workout[];
  getCurrentChallenge: () => DailyChallenge | null;
  joinFriendWorkout: (workoutId: string) => void;
  createFriendWorkout: (workout: Omit<FriendWorkout, 'id'>) => FriendWorkout;
}

const WorkoutContext = createContext<WorkoutContextType>({
  workouts: [],
  userWorkoutLogs: [],
  dailyChallenges: [],
  friendWorkouts: [],
  workoutStats: null,
  todaysWorkout: null,
  getWorkoutById: () => undefined,
  completeWorkout: () => {},
  getRecommendedWorkouts: () => [],
  getCurrentChallenge: () => null,
  joinFriendWorkout: () => {},
  createFriendWorkout: () => ({} as FriendWorkout),
});

export const useWorkout = () => useContext(WorkoutContext);

interface WorkoutProviderProps {
  children: React.ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const { currentUser, updateUserStreak, updateCompletedWorkouts } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [userWorkoutLogs, setUserWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [friendWorkouts, setFriendWorkouts] = useState<FriendWorkout[]>([]);
  const [workoutStats, setWorkoutStats] = useState<WorkoutStats | null>(null);
  const [todaysWorkout, setTodaysWorkout] = useState<Workout | null>(null);

  // Initialize workouts and challenges on mount
  useEffect(() => {
    // Load workouts from local storage or use initial data
    const storedWorkouts = localStorage.getItem('biobooster_workouts');
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    } else {
      setWorkouts(initialWorkouts);
      localStorage.setItem('biobooster_workouts', JSON.stringify(initialWorkouts));
    }

    // Load daily challenges from local storage or use initial data
    const storedChallenges = localStorage.getItem('biobooster_challenges');
    if (storedChallenges) {
      setDailyChallenges(JSON.parse(storedChallenges));
    } else {
      setDailyChallenges(initialChallenges);
      localStorage.setItem('biobooster_challenges', JSON.stringify(initialChallenges));
    }

    // Load friend workouts from local storage
    const storedFriendWorkouts = localStorage.getItem('biobooster_friend_workouts');
    if (storedFriendWorkouts) {
      setFriendWorkouts(JSON.parse(storedFriendWorkouts));
    }
  }, []);

  // Load user workout logs when user changes
  useEffect(() => {
    if (currentUser) {
      const storedLogs = localStorage.getItem(`biobooster_logs_${currentUser.id}`);
      if (storedLogs) {
        setUserWorkoutLogs(JSON.parse(storedLogs));
      } else {
        setUserWorkoutLogs([]);
      }
    } else {
      setUserWorkoutLogs([]);
    }
  }, [currentUser]);

  // Update workout stats when logs change
  useEffect(() => {
    if (currentUser && userWorkoutLogs.length > 0) {
      calculateWorkoutStats();
    } else {
      setWorkoutStats(null);
    }
  }, [userWorkoutLogs, currentUser]);

  // Update today's workout recommendation when user or workouts change
  useEffect(() => {
    if (currentUser && workouts.length > 0) {
      const recommendedWorkouts = getRecommendedWorkouts();
      if (recommendedWorkouts.length > 0) {
        setTodaysWorkout(recommendedWorkouts[0]);
      }
    } else {
      setTodaysWorkout(null);
    }
  }, [currentUser, workouts]);

  const calculateWorkoutStats = () => {
    if (!currentUser || userWorkoutLogs.length === 0) return;

    // Initialize stats object
    const stats: WorkoutStats = {
      totalWorkouts: userWorkoutLogs.length,
      totalExercises: 0,
      totalMinutes: 0,
      currentStreak: currentUser.streak,
      longestStreak: currentUser.streak, // This would need to be tracked over time
      workoutsByWeekday: [0, 0, 0, 0, 0, 0, 0], // [Sun, Mon, ..., Sat]
    };

    // Count exercises and duration
    const exerciseCounts: { [key: string]: number } = {};
    const muscleGroupCounts: { [key: string]: number } = {};

    userWorkoutLogs.forEach(log => {
      // Add duration
      stats.totalMinutes += log.duration;

      // Add exercises
      stats.totalExercises += log.exercises.length;

      // Count by weekday
      const weekday = new Date(log.date).getDay();
      stats.workoutsByWeekday[weekday]++;

      // Count exercise frequency
      log.exercises.forEach(exercise => {
        // Get the exercise details
        const workoutExercise = workouts
          .flatMap(w => w.exercises)
          .find(e => e.exerciseId === exercise.exerciseId);

        if (workoutExercise) {
          exerciseCounts[exercise.exerciseId] = (exerciseCounts[exercise.exerciseId] || 0) + 1;
        }
      });
    });

    // Find favorite exercise
    let favoriteExerciseId = '';
    let favoriteExerciseCount = 0;

    Object.entries(exerciseCounts).forEach(([id, count]) => {
      if (count > favoriteExerciseCount) {
        favoriteExerciseId = id;
        favoriteExerciseCount = count;
      }
    });

    // If we found a favorite, add it to stats
    if (favoriteExerciseId) {
      const exerciseDetails = workouts
        .flatMap(w => w.exercises)
        .find(e => e.exerciseId === favoriteExerciseId);

      if (exerciseDetails) {
        stats.favoriteExercise = {
          id: favoriteExerciseId,
          name: 'Favorite Exercise', // This would need to be retrieved from the exercises collection
          count: favoriteExerciseCount,
        };
      }
    }

    setWorkoutStats(stats);
  };

  const getWorkoutById = (id: string): Workout | undefined => {
    return workouts.find(workout => workout.id === id);
  };

  const completeWorkout = (workoutLog: WorkoutLog) => {
    if (!currentUser) return;

    // Add the new log
    const newLog = {
      ...workoutLog,
      id: uuidv4(),
      userId: currentUser.id,
      date: new Date(),
    };

    const updatedLogs = [...userWorkoutLogs, newLog];
    setUserWorkoutLogs(updatedLogs);

    // Save to local storage
    localStorage.setItem(`biobooster_logs_${currentUser.id}`, JSON.stringify(updatedLogs));

    // Update user stats
    updateCompletedWorkouts(1);
    updateUserStreak(1);
  };

  const getRecommendedWorkouts = (): Workout[] => {
    if (!currentUser) return [];

    const ageGroup = getAgeGroup(currentUser.age);
    const { fitnessLevel, fitnessGoals } = currentUser.settings;

    // Filter workouts by age group and fitness level
    let recommended = workouts.filter(workout => {
      // Match age group
      const ageMatch = workout.targetAgeGroup.includes(ageGroup as AgeGroup);
      
      // Match difficulty to fitness level
      let difficultyMatch = false;
      if (fitnessLevel === 'beginner' && workout.difficulty === DifficultyLevel.Beginner) {
        difficultyMatch = true;
      } else if (fitnessLevel === 'intermediate' && 
                (workout.difficulty === DifficultyLevel.Beginner || 
                 workout.difficulty === DifficultyLevel.Intermediate)) {
        difficultyMatch = true;
      } else if (fitnessLevel === 'advanced') {
        difficultyMatch = true; // Advanced users can do any difficulty
      }
      
      return ageMatch && difficultyMatch;
    });

    // Further prioritize by goals if available
    if (fitnessGoals && fitnessGoals.length > 0) {
      // Sort by how many goals match
      recommended.sort((a, b) => {
        const aMatches = a.goals.filter(goal => fitnessGoals.includes(goal)).length;
        const bMatches = b.goals.filter(goal => fitnessGoals.includes(goal)).length;
        return bMatches - aMatches;
      });
    }

    // Limit to top 5 recommendations
    return recommended.slice(0, 5);
  };

  const getCurrentChallenge = (): DailyChallenge | null => {
    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find a challenge for today's date
    const todayChallenge = dailyChallenges.find(challenge => {
      const challengeDate = new Date(challenge.date);
      challengeDate.setHours(0, 0, 0, 0);
      return challengeDate.getTime() === today.getTime();
    });

    return todayChallenge || null;
  };

  const joinFriendWorkout = (workoutId: string) => {
    if (!currentUser) return;

    // Find the workout
    const updatedFriendWorkouts = friendWorkouts.map(workout => {
      if (workout.id === workoutId && !workout.participants.includes(currentUser.id)) {
        return {
          ...workout,
          participants: [...workout.participants, currentUser.id]
        };
      }
      return workout;
    });

    setFriendWorkouts(updatedFriendWorkouts);
    localStorage.setItem('biobooster_friend_workouts', JSON.stringify(updatedFriendWorkouts));
  };

  const createFriendWorkout = (workout: Omit<FriendWorkout, 'id'>): FriendWorkout => {
    const newWorkout: FriendWorkout = {
      ...workout,
      id: uuidv4(),
    };

    const updatedFriendWorkouts = [...friendWorkouts, newWorkout];
    setFriendWorkouts(updatedFriendWorkouts);
    localStorage.setItem('biobooster_friend_workouts', JSON.stringify(updatedFriendWorkouts));

    return newWorkout;
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        userWorkoutLogs,
        dailyChallenges,
        friendWorkouts,
        workoutStats,
        todaysWorkout,
        getWorkoutById,
        completeWorkout,
        getRecommendedWorkouts,
        getCurrentChallenge,
        joinFriendWorkout,
        createFriendWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};