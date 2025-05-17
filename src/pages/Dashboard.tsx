import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext';
import { BarChart, Dumbbell, Award, Calendar, Clock, TrendingUp, Heart } from 'lucide-react';

const Dashboard = () => {
  const { theme } = useTheme();
  
  
  const stats = {
    workoutsCompleted: 12,
    streakDays: 5,
    minutesWorkedOut: 240,
    achievements: 7,
  };
  
  const recentWorkouts = [
    { id: 1, name: 'Full Body Challenge', date: '2 days ago', duration: 30 },
    { id: 2, name: 'Core Strengthening', date: '4 days ago', duration: 20 },
    { id: 3, name: 'Lower Body Focus', date: '1 week ago', duration: 45 },
  ];
  
  
  const StatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: number, unit: string }) => (
    <Card className="flex items-center p-4 transform transition-transform hover:scale-102">
      <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value} <span className="text-sm font-normal">{unit}</span></p>
      </div>
    </Card>
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and stay motivated on your fitness journey.
          </p>
        </div>
        
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <StatCard 
            icon={<Dumbbell className="h-6 w-6" />}
            title="Workouts Completed"
            value={stats.workoutsCompleted}
            unit="workouts"
          />
          <StatCard 
            icon={<Calendar className="h-6 w-6" />}
            title="Current Streak"
            value={stats.streakDays}
            unit="days"
          />
          <StatCard 
            icon={<Clock className="h-6 w-6" />}
            title="Total Workout Time"
            value={stats.minutesWorkedOut}
            unit="minutes"
          />
          <StatCard 
            icon={<Award className="h-6 w-6" />}
            title="Achievements Earned"
            value={stats.achievements}
            unit="badges"
          />
        </div>
        
        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Health Metrics</h2>
              <Button variant="outline" size="sm">Update</Button>
            </div>
            
            <div className="space-y-6">
              {}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" /> Weight
                  </span>
                  <span className="font-bold">165 lbs</span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-green-600" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Starting: 180 lbs</span>
                  <span>Goal: 160 lbs</span>
                </div>
              </div>
              
              {}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium flex items-center">
                    <Heart className="h-5 w-5 mr-2" /> BMI
                  </span>
                  <span className="font-bold">24.2</span>
                </div>
                <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                </div>
              </div>
              
              {}
              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                <h3 className="font-medium text-blue-600 dark:text-blue-400">Recovery Recommendation</h3>
                <p className="text-sm mt-1">Based on your recent activity, today would be a good rest day. Consider gentle stretching or yoga.</p>
              </div>
            </div>
          </Card>
          
          {}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Achievements</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center justify-center"
                >
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <Award className="h-8 w-8 text-yellow-500" />
                  </div>
                  <span className="text-xs text-center">Achievement {i+1}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">
              Complete workouts to earn more badges!
            </p>
          </Card>
          
          {}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Workouts</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentWorkouts.map(workout => (
                <div 
                  key={workout.id}
                  className={`p-4 rounded-lg flex items-center justify-between transform transition-transform hover:scale-102 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-4 ${theme === 'dark' ? 'bg-blue-900 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{workout.name}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{workout.duration} min</p>
                    <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;