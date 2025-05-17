import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'Age-Based Workouts',
      description: 'Personalized workouts for teens, adults, and seniors based on your specific needs and capabilities.'
    },
    {
      title: 'No Equipment Needed',
      description: 'All our workouts use only bodyweight exercises - no equipment required, just your motivation!'
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor your fitness journey with detailed progress tracking and personal achievements.'
    },
    {
      title: 'Daily Challenges',
      description: 'Stay motivated with exciting daily challenges that push your limits and build consistency.'
    },
    {
      title: 'Workout With Friends',
      description: 'Make fitness fun by inviting friends to join your workouts either live or asynchronously.'
    },
    {
      title: 'Smart Recommendations',
      description: 'Receive intelligent workout suggestions based on your history, preferences, and fitness goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-gradient-to-br from-primary-600 to-primary-500 text-white py-16 md:py-24">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Body is the Only Gym You Need
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Transform your fitness journey with BioBooster's no-equipment workouts 
              tailored to your age and fitness level.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
                  >
                    Start Your Journey
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-medium"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Why Choose BioBooster?
            </h2>
            <p className="text-lg text-gray-600">
              Our platform is designed to make fitness accessible to everyone, regardless of age or experience level.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Workouts For Every Age
            </h2>
            <p className="text-lg text-gray-600">
              Our age-specific workouts ensure that you get the right exercise for your body's needs and capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-accent-500 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <h3 className="text-2xl font-bold text-white z-10">Teens</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Energy-focused workouts designed for growing bodies, emphasizing form, balance, and building healthy habits early.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Form-focused exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Energy release activities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Foundational strength building</span>
                  </li>
                </ul>
                {isAuthenticated ? (
                  <Link to="/exercises" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Explore Teen Workouts <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                ) : (
                  <Link to="/register" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Get Started <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-primary-500 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <h3 className="text-2xl font-bold text-white z-10">Adults</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Balanced routines focusing on strength, HIIT, and endurance to help busy adults stay fit despite hectic schedules.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Efficient HIIT routines</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Strength building exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Endurance focused training</span>
                  </li>
                </ul>
                {isAuthenticated ? (
                  <Link to="/exercises" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Explore Adult Workouts <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                ) : (
                  <Link to="/register" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Get Started <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 bg-secondary-500 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
                <h3 className="text-2xl font-bold text-white z-10">Seniors</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Gentle, low-impact exercises designed to improve mobility, flexibility, and maintain independence.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Joint-friendly movements</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Balance improvement exercises</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Flexibility & mobility focus</span>
                  </li>
                </ul>
                {isAuthenticated ? (
                  <Link to="/exercises" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Explore Senior Workouts <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                ) : (
                  <Link to="/register" className="flex items-center text-primary-500 font-medium hover:text-primary-600">
                    Get Started <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <section className="py-16 md:py-24 bg-accent-500 text-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Fitness Journey?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join thousands who are getting fit with BioBooster's equipment-free home workouts.
              No gym membership, no equipment costs - just you and your commitment.
            </p>
            <div>
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="btn bg-white text-accent-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
                >
                  View Your Dashboard
                </Link>
              ) : (
                <Link 
                  to="/register" 
                  className="btn bg-white text-accent-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
                >
                  Start For Free
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>


      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              See how BioBooster has helped people of all ages achieve their fitness goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-gray-500 text-sm">Age 34, Working Mom</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "BioBooster has been a game-changer for my fitness routine. As a busy mom, I never thought 
                I could find time to work out, but these quick, effective routines fit perfectly into my schedule."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Mike T.</h4>
                  <p className="text-gray-500 text-sm">Age 16, Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I wanted to get stronger but didn't know where to start. The teen workouts helped me build 
                confidence and improve my athletic performance without needing a gym membership."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Robert J.</h4>
                  <p className="text-gray-500 text-sm">Age 68, Retired</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "At my age, I was worried about exercise safety. BioBooster's senior-focused workouts have 
                improved my mobility and strength while being gentle on my joints. I feel 10 years younger!"
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;