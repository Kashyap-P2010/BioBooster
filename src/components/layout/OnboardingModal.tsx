import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function OnboardingModal() {
  const { user, updateUser, isNewUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [goal, setGoal] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    
    if (isNewUser && !user) {
      setIsOpen(true);
    }
  }, [isNewUser, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }
      setError('');
      setStep(2);
      return;
    }
    
   
    updateUser({
      name,
      fitnessLevel,
      goal,
      streakCount: 0,
      workoutHistory: [],
      workoutDays: [],
    });
    
    setIsOpen(false);
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? 'Welcome to BioBooster!' : 'Customize Your Experience'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Let's personalize your fitness journey. What should we call you?
              </p>
              <Input
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                fullWidth
                error={error}
                autoFocus
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fitness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`py-2 px-3 rounded-md border text-sm font-medium transition-colors ${
                        fitnessLevel === level
                          ? 'bg-primary-100 dark:bg-primary-900 border-primary-500 dark:border-primary-500 text-primary-800 dark:text-primary-300'
                          : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setFitnessLevel(level)}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <Input
                label="Fitness Goal (Optional)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Lose weight, build muscle, increase endurance"
                fullWidth
              />
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <Button type="submit">
              {step === 1 ? 'Continue' : 'Get Started'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}