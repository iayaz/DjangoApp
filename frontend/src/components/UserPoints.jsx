import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const UserPoints = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        const response = await axios.get('/users/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks/');
        setTasks(response.data.filter(task => task.completed));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4 px-6">
        <h2 className="text-2xl font-bold">{user ? `Hello ${user.username}` : 'Hello User'}</h2>
      </nav>

      {/* Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-200 p-4 w-1/6">
          <ul>
            <li className="mb-4">
              <Link to="/user/home" className="text-gray-800 hover:text-gray-600">Home</Link>
            </li>
            <li className="mb-4">
              <Link to="/user/profile" className="text-gray-800 hover:text-gray-600">Profile</Link>
            </li>
            <li className="mb-4">
              <Link to="/user/points" className="text-gray-800 hover:text-gray-600">Points</Link>
            </li>
            <li>
              <Link to="/logout" className="text-gray-800 hover:text-gray-600">Logout</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
            <h1 className="text-2xl font-bold mb-4">Points Earned</h1>
            {tasks.length > 0 ? (
              <ul>
                {tasks.map((task) => (
                  <li key={task.id} className="mb-2">
                    <div className="p-4 border border-gray-300 rounded flex justify-between items-center">
                      <span>{task.app.name}</span>
                      <span>{task.app.points} Points</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 border border-gray-300 rounded flex justify-between items-center">
                <span>No completed tasks</span>
                <span>0 Points</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPoints;
