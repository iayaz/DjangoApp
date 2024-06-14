import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [apps, setApps] = useState([]);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchApps = async () => {
      axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
      const response = await axios.get('/apps/');
      setApps(response.data);
    };
    fetchApps();

    const u = require('../assets/snapchat.png');
    setUrl(u);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4 px-6">
        <h2 className="text-2xl font-bold">Hello Admin</h2>
      </nav>

      {/* Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="bg-gray-200 p-4 w-1/6">
          <ul>
            <li className="mb-4">
              <Link to="/admin" className="text-gray-800 hover:text-gray-600">Home</Link>
            </li>
            <li>
              <Link to="/admin/addapp" className="text-gray-800 hover:text-gray-600">Add App</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-y-auto">
          {/* App List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <div key={app.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={url} alt={app.name} className="w-32 h-32 object-cover mb-2 rounded-lg" />
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{app.name}</h3>
                  <span className="text-sm">{app.points} Points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
