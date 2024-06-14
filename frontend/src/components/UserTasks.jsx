import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/tasks/');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-2">
              <Link to={`/task/${task.id}`}>
                <div className="p-4 border border-gray-300 rounded flex justify-between items-center">
                  <span>{task.app.name}</span>
                  <span>{task.completed ? 'Completed' : 'Incomplete'}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserTasks;
