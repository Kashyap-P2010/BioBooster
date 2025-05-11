import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  age: number;
}

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const { 
    register: registerField, 
    handleSubmit, 
    watch,
    setError, 
    formState: { errors, isSubmitting } 
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      const success = await register(data.username, data.password, data.age);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('username', { 
          type: 'manual', 
          message: 'Username already exists' 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('username', { 
        type: 'manual', 
        message: 'An error occurred during registration' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="bg-accent-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p className="text-accent-100">Start your home fitness journey today</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  className={`form-input ${errors.username ? 'border-error-500 focus:ring-error-500' : ''}`}
                  {...registerField('username', { 
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters'
                    }
                  })}
                />
                {errors.username && (
                  <p className="form-error">{errors.username.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`form-input ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                  {...registerField('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                  {...registerField('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => 
                      value === password || 'The passwords do not match'
                  })}
                />
                {errors.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  id="age"
                  type="number"
                  className={`form-input ${errors.age ? 'border-error-500 focus:ring-error-500' : ''}`}
                  {...registerField('age', { 
                    required: 'Age is required',
                    min: {
                      value: 13,
                      message: 'You must be at least 13 years old'
                    },
                    max: {
                      value: 100,
                      message: 'Age must be 100 or less'
                    }
                  })}
                />
                {errors.age && (
                  <p className="form-error">{errors.age.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent w-full py-2.5"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-accent-500 hover:text-accent-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;