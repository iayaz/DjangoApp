import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';
import appImage from '../assets/snapchat.png';

const UserHome = () => {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Fetch user data
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

    // Fetch apps data
    const fetchApps = async () => {
      try {
        const response = await axios.get('/apps/');
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4 px-6">
        <h2 className="text-2xl font-bold">{user ? `Hello ${user.username}` : 'Hello User'}</h2> {/* Display user's name */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <Link to={`/user/apps/${app.id}`} key={app.id} className="block">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img src={appImage} alt={app.name} className="w-32 h-32 object-cover mb-2 rounded-lg" />
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{app.name}</h3>
                    <span className="text-sm">{app.points} Points</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
