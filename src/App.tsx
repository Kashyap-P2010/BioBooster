import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useTheme } from './contexts/ThemeContext';
import ActiveWorkout from './pages/ActiveWorkout';
import CompleteWorkout from './pages/CompleteWorkout';
import CreateWorkout from './pages/CreateWorkout';
import ExerciseDetails from './pages/ExerciseDetails';
import ExerciseLibrary from './pages/ExerciseLibrary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Workout from './pages/Workout';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="exercises" element={<ExerciseLibrary />} />
          <Route path="exercises/:id" element={<ExerciseDetails />} />
          <Route path="workout" element={<Workout />} />
          <Route path="workout/active" element={<ActiveWorkout />} />
          <Route path="workout/create" element={<CreateWorkout />} />
          <Route path="workout/complete" element={<CompleteWorkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;