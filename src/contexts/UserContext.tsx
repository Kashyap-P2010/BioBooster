import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  user: UserProfile | null;
  updateUser: (user: UserProfile) => void;
  addWorkoutToHistory: (workout: any) => void;
  isNewUser: boolean;
  setIsNewUser: (value: boolean) => void;
}

const defaultUser: UserProfile = {
  name: '',
  fitnessLevel: 'beginner',
  streakCount: 0,
  workoutHistory: [],
  workoutDays: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('biobooster-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isNewUser, setIsNewUser] = useState(() => {
    return !localStorage.getItem('biobooster-user');
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('biobooster-user', JSON.stringify(user));
    }
  }, [user]);

  const updateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    setIsNewUser(false);
  };

  const addWorkoutToHistory = (workoutHistory: any) => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const workoutDays = [...user.workoutDays];
    
    if (!workoutDays.includes(today)) {
      workoutDays.push(today);
    }
    
   
    const sortedDays = [...workoutDays].sort();
    let streakCount = 0;
    

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    if (workoutDays.includes(today) || workoutDays.includes(yesterdayString)) {
      streakCount = user.streakCount + 1;
    } else {
      streakCount = 1; 
    }
    
    setUser({
      ...user,
      workoutHistory: [...user.workoutHistory, workoutHistory],
      workoutDays,
      streakCount,
    });
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        updateUser, 
        addWorkoutToHistory, 
        isNewUser,
        setIsNewUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}