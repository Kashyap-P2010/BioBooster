import Layout from '../components/common/Layout';
import ExerciseList from '../components/exercises/ExerciseList';

const Exercises = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Exercise Library</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our collection of 50 bodyweight exercises for all fitness levels. Filter by difficulty, muscle group, or search for specific exercises.
          </p>
        </div>
        
        <ExerciseList />
      </div>
    </Layout>
  );
};

export default Exercises;