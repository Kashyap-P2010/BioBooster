import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, FlameIcon, LineChart, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useUser } from '../contexts/UserContext';

export default function Home() {
  const { user } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div>

      <section className="relative pt-16 md:pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/5 dark:from-primary-900/20 dark:to-secondary-900/10 -z-10" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text"
              variants={itemVariants}
            >
              Elevate Your Fitness Journey
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10"
              variants={itemVariants}
            >
              Transform your body and mind with personalized workouts, no equipment needed. 
              Track your progress and achieve your fitness goals with BioBooster.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link to="/workout">
                <Button variant="primary" size="lg">
                  Start a Workout
                </Button>
              </Link>
              <Link to="/exercises">
                <Button variant="outline" size="lg">
                  Browse Exercises
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BioBooster?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform offers everything you need to create an effective fitness routine that fits your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="rounded-full bg-primary-100 dark:bg-primary-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Dumbbell className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Plans</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create custom workouts tailored to your fitness level, goals, and available equipment.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 h-full">
                <div className="rounded-full bg-secondary-100 dark:bg-secondary-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Timer className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Time Efficiency</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quick and effective workouts that fit into your busy schedule, with built-in timers and rest periods.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 h-full">
                <div className="rounded-full bg-accent-100 dark:bg-accent-900 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor your achievements, track workout streaks, and visualize your fitness journey.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Workouts for Every Goal</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from a variety of workout categories designed for different fitness goals and experience levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Upper Body", icon: "💪", color: "from-blue-500 to-purple-500" },
              { name: "Core Strength", icon: "🔄", color: "from-green-500 to-teal-500" },
              { name: "Lower Body", icon: "🦵", color: "from-orange-500 to-red-500" },
              { name: "Full Body", icon: "⚡", color: "from-pink-500 to-purple-500" },
              { name: "Mobility", icon: "🧘", color: "from-teal-500 to-cyan-500" },
              { name: "Quick Sessions", icon: "⏱️", color: "from-amber-500 to-orange-500" },
              { name: "Senior Friendly", icon: "🌟", color: "from-emerald-500 to-green-500" },
              { name: "Teen Workouts", icon: "🚀", color: "from-indigo-500 to-blue-500" }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to="/workout" className="block">
                  <div className={`rounded-xl overflow-hidden relative h-40 bg-gradient-to-br ${category.color} transition-transform duration-300`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                      <span className="text-3xl mb-2">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Fitness Journey?</h2>
              <p className="text-white/80 max-w-xl">
                Start today with BioBooster and transform your fitness routine with personalized workouts and progress tracking.
              </p>
            </div>
            
            <div>
              {user ? (
                <Link to="/workout/create">
                  <Button 
                    variant="accent" 
                    size="lg"
                    className="group"
                  >
                    Create Your Workout
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              ) : (
                <Link to="/profile">
                  <Button 
                    variant="accent" 
                    size="lg"
                    className="group"
                  >
                    Create Your Profile
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      

      {user && user.streakCount > 0 && (
        <section className="py-10 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-6 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <FlameIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Current Streak: {user.streakCount} days</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Keep it going! Don't break your streak.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}