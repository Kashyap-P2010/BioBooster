import { ArrowRight, Activity, Award, Clock, Filter } from 'lucide-react';
import Layout from '../components/common/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();
  
  const heroImageUrl = "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
  
  // Features data
  const features = [
    {
      icon: <Activity className="h-6 w-6" />,
      title: 'Personalized Workouts',
      description: 'Get daily workouts tailored to your fitness level, goals, and available time.'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Achievement System',
      description: 'Stay motivated with badges, level-ups, and streaks as you progress in your fitness journey.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Smart Timer',
      description: 'Customize rest periods and work intervals to match your workout intensity needs.'
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: 'Targeted Routines',
      description: 'Choose workouts that focus on specific muscle groups or go for a full-body experience.'
    }
  ];
  
  // Program cards data
  const programs = [
    {
      title: "Beginner's Path",
      description: "Perfect for those just starting their fitness journey. Build a foundation with gentle, effective workouts.",
      imageUrl: "https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/workouts"
    },
    {
      title: "30-Day Challenge",
      description: "Take your fitness to the next level with our progressive 30-day program designed for consistent improvement.",
      imageUrl: "https://images.pexels.com/photos/9316316/pexels-photo-9316316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/workouts"
    },
    {
      title: "Senior Vitality",
      description: "Age-appropriate workouts that focus on mobility, strength, and balance for older adults.",
      imageUrl: "https://images.pexels.com/photos/7991524/pexels-photo-7991524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "/workouts"
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <img 
            src={heroImageUrl} 
            alt="Person exercising" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Body, Your Workout, <span className="text-blue-400">No Equipment</span> Needed
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Personalized workouts for everyone - beginners, fitness enthusiasts, teens, adults, and seniors. Start your journey to a better you today.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                variant="primary" 
                className="transform transition-transform hover:scale-105"
                onClick={() => window.location.href = '/workouts'}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white/10 transition-all"
                onClick={() => window.location.href = '/exercises'}
              >
                Browse Exercises
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Features That Make Us Different</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              We've designed FitLife to be the most user-friendly, effective, and motivating fitness platform available.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 hover:border-blue-500 transition-all duration-300"
                hoverable
              >
                <div className={`
                  p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4
                  ${theme === 'dark' ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}
                `}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Programs Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Programs</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Choose a program that fits your needs and goals. All programs can be customized to your fitness level.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                hoverable
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={program.imageUrl} 
                    alt={program.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {program.description}
                  </p>
                  <a 
                    href={program.link}
                    className={`
                      font-medium flex items-center
                      ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}
                    `}
                  >
                    Get Started <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of people who have already started their fitness journey with FitLife. No equipment, no gym, just you and your commitment.
          </p>
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600 transform transition-transform hover:scale-105"
            onClick={() => window.location.href = '/workouts'}
          >
            Start Your Free Program Today
          </Button>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Hear from people who have transformed their fitness with our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300" alt="User" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold">Sarah J.</h3>
                <p className="text-sm text-gray-500 mb-4">Lost 15lbs in 3 months</p>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  "I love how I can work out anywhere without any equipment. The personalized workouts keep me challenged and motivated!"
                </p>
              </div>
            </Card>
            
            {/* Testimonial 2 */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300" alt="User" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold">Mike T.</h3>
                <p className="text-sm text-gray-500 mb-4">Building strength at 58</p>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  "The senior-focused workouts have helped me regain mobility and strength. I feel 10 years younger already!"
                </p>
              </div>
            </Card>
            
            {/* Testimonial 3 */}
            <Card className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                  <img src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=300" alt="User" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold">Jamie L.</h3>
                <p className="text-sm text-gray-500 mb-4">College student</p>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  "I can fit these workouts into my busy schedule! I love the achievement system that keeps me coming back."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;