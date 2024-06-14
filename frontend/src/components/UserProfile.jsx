import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      const response = await axios.get('/users/me/');
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4 px-6">
        <h2 className="text-2xl font-bold">Hello {user.username}</h2>
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
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
