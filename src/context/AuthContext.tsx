import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UserSettings, getDefaultSettingsForAge, FitnessLevel, FitnessGoal } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, age: number) => Promise<boolean>;
  logout: () => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  updateUserStreak: (increment: number) => void;
  updateCompletedWorkouts: (increment: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => {},
  updateUserSettings: () => {},
  updateUserStreak: () => {},
  updateCompletedWorkouts: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // On mount, check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('biobooster_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('biobooster_user');
      }
    }
  }, []);

  // Helper to save users to local storage
  const saveUsers = (users: User[]) => {
    localStorage.setItem('biobooster_users', JSON.stringify(users));
  };

  // Helper to get users from local storage
  const getUsers = (): User[] => {
    const storedUsers = localStorage.getItem('biobooster_users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  // Save current user to local storage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('biobooster_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('biobooster_user');
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date(),
      };
      
      // Save updated user back to users list
      const updatedUsers = users.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      );
      saveUsers(updatedUsers);
      
      setCurrentUser(updatedUser);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const register = async (username: string, password: string, age: number): Promise<boolean> => {
    const users = getUsers();
    
    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      return false;
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      password,
      age,
      createdAt: new Date(),
      streak: 0,
      completedWorkouts: 0,
      friends: [],
      settings: getDefaultSettingsForAge(age),
    };

    saveUsers([...users, newUser]);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateUserSettings = (settings: Partial<UserSettings>) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      settings: {
        ...currentUser.settings,
        ...settings,
      },
    };

    // Update in users list
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    
    setCurrentUser(updatedUser);
  };

  const updateUserStreak = (increment: number) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      streak: currentUser.streak + increment,
    };

    // Update in users list
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    
    setCurrentUser(updatedUser);
  };

  const updateCompletedWorkouts = (increment: number) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      completedWorkouts: currentUser.completedWorkouts + increment,
    };

    // Update in users list
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
        updateUserSettings,
        updateUserStreak,
        updateCompletedWorkouts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};