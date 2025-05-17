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


  useEffect(() => {
    
    const storedWorkouts = localStorage.getItem('biobooster_workouts');
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    } else {
      setWorkouts(initialWorkouts);
      localStorage.setItem('biobooster_workouts', JSON.stringify(initialWorkouts));
    }


    const storedChallenges = localStorage.getItem('biobooster_challenges');
    if (storedChallenges) {
      setDailyChallenges(JSON.parse(storedChallenges));
    } else {
      setDailyChallenges(initialChallenges);
      localStorage.setItem('biobooster_challenges', JSON.stringify(initialChallenges));
    }

    
    const storedFriendWorkouts = localStorage.getItem('biobooster_friend_workouts');
    if (storedFriendWorkouts) {
      setFriendWorkouts(JSON.parse(storedFriendWorkouts));
    }
  }, []);

 
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

  useEffect(() => {
    if (currentUser && userWorkoutLogs.length > 0) {
      calculateWorkoutStats();
    } else {
      setWorkoutStats(null);
    }
  }, [userWorkoutLogs, currentUser]);

  
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

  
    const stats: WorkoutStats = {
      totalWorkouts: userWorkoutLogs.length,
      totalExercises: 0,
      totalMinutes: 0,
      currentStreak: currentUser.streak,
      longestStreak: currentUser.streak, 
      workoutsByWeekday: [0, 0, 0, 0, 0, 0, 0], 
    };

 
    const exerciseCounts: { [key: string]: number } = {};
    const muscleGroupCounts: { [key: string]: number } = {};

    userWorkoutLogs.forEach(log => {
     
      stats.totalMinutes += log.duration;

      stats.totalExercises += log.exercises.length;

      const weekday = new Date(log.date).getDay();
      stats.workoutsByWeekday[weekday]++;

      log.exercises.forEach(exercise => {
        const workoutExercise = workouts
          .flatMap(w => w.exercises)
          .find(e => e.exerciseId === exercise.exerciseId);

        if (workoutExercise) {
          exerciseCounts[exercise.exerciseId] = (exerciseCounts[exercise.exerciseId] || 0) + 1;
        }
      });
    });

    let favoriteExerciseId = '';
    let favoriteExerciseCount = 0;

    Object.entries(exerciseCounts).forEach(([id, count]) => {
      if (count > favoriteExerciseCount) {
        favoriteExerciseId = id;
        favoriteExerciseCount = count;
      }
    });

    if (favoriteExerciseId) {
      const exerciseDetails = workouts
        .flatMap(w => w.exercises)
        .find(e => e.exerciseId === favoriteExerciseId);

      if (exerciseDetails) {
        stats.favoriteExercise = {
          id: favoriteExerciseId,
          name: 'Favorite Exercise',
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

    const newLog = {
      ...workoutLog,
      id: uuidv4(),
      userId: currentUser.id,
      date: new Date(),
    };

    const updatedLogs = [...userWorkoutLogs, newLog];
    setUserWorkoutLogs(updatedLogs);

    localStorage.setItem(`biobooster_logs_${currentUser.id}`, JSON.stringify(updatedLogs));

    updateCompletedWorkouts(1);
    updateUserStreak(1);
  };

  const getRecommendedWorkouts = (): Workout[] => {
    if (!currentUser) return [];

    const ageGroup = getAgeGroup(currentUser.age);
    const { fitnessLevel, fitnessGoals } = currentUser.settings;

    let recommended = workouts.filter(workout => {
      
      const ageMatch = workout.targetAgeGroup.includes(ageGroup as AgeGroup);
      
      let difficultyMatch = false;
      if (fitnessLevel === 'beginner' && workout.difficulty === DifficultyLevel.Beginner) {
        difficultyMatch = true;
      } else if (fitnessLevel === 'intermediate' && 
                (workout.difficulty === DifficultyLevel.Beginner || 
                 workout.difficulty === DifficultyLevel.Intermediate)) {
        difficultyMatch = true;
      } else if (fitnessLevel === 'advanced') {
        difficultyMatch = true; 
      }
      
      return ageMatch && difficultyMatch;
    });

    if (fitnessGoals && fitnessGoals.length > 0) {
      recommended.sort((a, b) => {
        const aMatches = a.goals.filter(goal => fitnessGoals.includes(goal)).length;
        const bMatches = b.goals.filter(goal => fitnessGoals.includes(goal)).length;
        return bMatches - aMatches;
      });
    }

    return recommended.slice(0, 5);
  };

  const getCurrentChallenge = (): DailyChallenge | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayChallenge = dailyChallenges.find(challenge => {
      const challengeDate = new Date(challenge.date);
      challengeDate.setHours(0, 0, 0, 0);
      return challengeDate.getTime() === today.getTime();
    });

    return todayChallenge || null;
  };

  const joinFriendWorkout = (workoutId: string) => {
    if (!currentUser) return;

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