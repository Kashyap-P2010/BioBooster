import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Clock, Calendar, Video, MessageCircle, Dumbbell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkout } from '../context/WorkoutContext';
import { FriendWorkout } from '../models/Workout';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

const FriendsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { friendWorkouts, workouts, joinFriendWorkout, createFriendWorkout } = useWorkout();
  
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    workoutId: '',
    scheduledDate: '',
    scheduledTime: '',
    isLive: true
  });
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showJoinConfirmation, setShowJoinConfirmation] = useState<string | null>(null);

  // Load all users from local storage
  useEffect(() => {
    const storedUsers = localStorage.getItem('biobooster_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      setAllUsers(users.filter((user: User) => user.id !== currentUser?.id));
    }
  }, [currentUser]);

  const handleCreateWorkout = () => {
    if (!currentUser) return;
    if (!newWorkout.name || !newWorkout.workoutId || selectedFriends.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedWorkout = workouts.find(w => w.id === newWorkout.workoutId);
    if (!selectedWorkout) return;

    let scheduledDate = null;
    if (newWorkout.scheduledDate && newWorkout.scheduledTime) {
      scheduledDate = new Date(`${newWorkout.scheduledDate}T${newWorkout.scheduledTime}`);
    }

    const friendWorkout: Omit<FriendWorkout, 'id'> = {
      hostUserId: currentUser.id,
      name: newWorkout.name,
      description: newWorkout.description,
      workout: selectedWorkout,
      scheduledDate: scheduledDate || undefined,
      participants: [currentUser.id, ...selectedFriends],
      isLive: newWorkout.isLive,
      status: scheduledDate ? 'scheduled' : 'active',
      results: []
    };

    createFriendWorkout(friendWorkout);
    setShowCreateWorkout(false);
    resetForm();
  };

  const handleJoinWorkout = (workoutId: string) => {
    joinFriendWorkout(workoutId);
    setShowJoinConfirmation(null);
  };

  const toggleFriendSelection = (userId: string) => {
    if (selectedFriends.includes(userId)) {
      setSelectedFriends(selectedFriends.filter(id => id !== userId));
    } else {
      setSelectedFriends([...selectedFriends, userId]);
    }
  };

  const resetForm = () => {
    setNewWorkout({
      name: '',
      description: '',
      workoutId: '',
      scheduledDate: '',
      scheduledTime: '',
      isLive: true
    });
    setSelectedFriends([]);
  };

  const getUserName = (userId: string): string => {
    const user = allUsers.find(user => user.id === userId);
    return user ? user.username : 'Unknown User';
  };

  // Filter workouts: active/upcoming workouts the user is part of, and other available workouts
  const userWorkouts = friendWorkouts.filter(
    workout => workout.participants.includes(currentUser?.id || '')
  );
  
  const otherWorkouts = friendWorkouts.filter(
    workout => 
      !workout.participants.includes(currentUser?.id || '') && 
      workout.status !== 'completed'
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Workout With Friends</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay motivated by working out with friends! Create group workouts, join live sessions, 
            or compete in asynchronous challenges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button 
            onClick={() => setShowCreateWorkout(true)}
            className="btn-primary flex items-center justify-center"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create Group Workout
          </button>
        </div>

        {/* Create Group Workout Form */}
        {showCreateWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Group Workout</h2>

                <div className="space-y-4">
                  <div>
                    <label className="form-label">Workout Name</label>
                    <input
                      type="text"
                      value={newWorkout.name}
                      onChange={e => setNewWorkout({...newWorkout, name: e.target.value})}
                      className="form-input"
                      placeholder="e.g., Morning Cardio Session"
                    />
                  </div>

                  <div>
                    <label className="form-label">Description</label>
                    <textarea
                      value={newWorkout.description}
                      onChange={e => setNewWorkout({...newWorkout, description: e.target.value})}
                      className="form-input"
                      rows={3}
                      placeholder="Let your friends know what to expect"
                    ></textarea>
                  </div>

                  <div>
                    <label className="form-label">Select Workout</label>
                    <select
                      value={newWorkout.workoutId}
                      onChange={e => setNewWorkout({...newWorkout, workoutId: e.target.value})}
                      className="form-input"
                    >
                      <option value="">-- Select a workout --</option>
                      {workouts.map(workout => (
                        <option key={workout.id} value={workout.id}>
                          {workout.name} ({workout.difficulty}, {workout.duration} min)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Date (Optional)</label>
                      <input
                        type="date"
                        value={newWorkout.scheduledDate}
                        onChange={e => setNewWorkout({...newWorkout, scheduledDate: e.target.value})}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Time (Optional)</label>
                      <input
                        type="time"
                        value={newWorkout.scheduledTime}
                        onChange={e => setNewWorkout({...newWorkout, scheduledTime: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Workout Type</label>
                    <div className="flex gap-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={newWorkout.isLive}
                          onChange={() => setNewWorkout({...newWorkout, isLive: true})}
                          className="mr-2"
                        />
                        <span>Live Session</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!newWorkout.isLive}
                          onChange={() => setNewWorkout({...newWorkout, isLive: false})}
                          className="mr-2"
                        />
                        <span>Asynchronous</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Invite Friends</label>
                    {allUsers.length === 0 ? (
                      <p className="text-gray-500 text-sm">No other users are available to invite</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                        {allUsers.map(user => (
                          <label key={user.id} className="flex items-center p-2 border rounded hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={selectedFriends.includes(user.id)}
                              onChange={() => toggleFriendSelection(user.id)}
                              className="mr-3"
                            />
                            <span>{user.username}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setShowCreateWorkout(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateWorkout}
                    className="btn-primary"
                  >
                    Create Workout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Join Confirmation Modal */}
        {showJoinConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Join Group Workout</h2>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to join this workout session? You'll be able to see who else is participating.
                </p>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setShowJoinConfirmation(null)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleJoinWorkout(showJoinConfirmation)}
                    className="btn-primary"
                  >
                    Join Workout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Your Group Workouts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Your Group Workouts</h2>
          
          {userWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userWorkouts.map(workout => (
                <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className={`p-1 ${workout.isLive ? 'bg-primary-500' : 'bg-secondary-500'} text-white text-center text-xs font-medium`}>
                    {workout.isLive ? 'Live Session' : 'Asynchronous Challenge'}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">{workout.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{workout.description}</p>
                    
                    {workout.scheduledDate && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(workout.scheduledDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Dumbbell className="w-4 h-4 mr-1" />
                      <span>{workout.workout.name} ({workout.workout.duration} min)</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Participants</h4>
                      <div className="flex flex-wrap gap-1">
                        {workout.participants.map(userId => (
                          <span key={userId} className="inline-flex items-center text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            {userId === workout.hostUserId && (
                              <span className="w-2 h-2 bg-primary-500 rounded-full mr-1"></span>
                            )}
                            {getUserName(userId)}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      {workout.isLive && workout.status === 'active' && (
                        <button className="btn-primary flex items-center">
                          <Video className="w-4 h-4 mr-1" />
                          Join Session
                        </button>
                      )}
                      {!workout.isLive && (
                        <button className="btn-primary flex items-center">
                          <Dumbbell className="w-4 h-4 mr-1" />
                          Start Workout
                        </button>
                      )}
                      <button className="btn-outline flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600 mb-4">You haven't joined any group workouts yet.</p>
              <button 
                onClick={() => setShowCreateWorkout(true)}
                className="btn-primary"
              >
                Create Your First Group Workout
              </button>
            </div>
          )}
        </section>

        {/* Available Group Workouts */}
        {otherWorkouts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Available Group Workouts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherWorkouts.map(workout => (
                <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className={`p-1 ${workout.isLive ? 'bg-primary-500' : 'bg-secondary-500'} text-white text-center text-xs font-medium`}>
                    {workout.isLive ? 'Live Session' : 'Asynchronous Challenge'}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{workout.name}</h3>
                      <span className="text-xs text-gray-500">
                        Host: {getUserName(workout.hostUserId)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{workout.description}</p>
                    
                    {workout.scheduledDate && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(workout.scheduledDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Dumbbell className="w-4 h-4 mr-1" />
                      <span>{workout.workout.name} ({workout.workout.duration} min)</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{workout.participants.length} participants</span>
                    </div>
                    
                    <button 
                      onClick={() => setShowJoinConfirmation(workout.id)}
                      className="btn-primary w-full"
                    >
                      Join Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;