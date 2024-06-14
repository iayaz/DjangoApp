import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';
import { useDropzone } from 'react-dropzone';
import appImage from '../assets/snapchat.png';
import { Link } from 'react-router-dom';

const AppDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [user, setUser] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await axios.get(`/apps/${id}/`);
        setApp(response.data);
      } catch (error) {
        console.error('Error fetching app details:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        const response = await axios.get('/users/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAppDetails();
    fetchUserData();
  }, [id]);

  const onDrop = useCallback((acceptedFiles) => {
    // Handle file upload logic here
    setScreenshots([...screenshots, ...acceptedFiles]);
  }, [screenshots]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          {app ? (
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
              <div className="flex items-center mb-4">
                <img src={appImage} alt={app.name} className="w-32 h-32 object-cover mr-4 rounded-lg" />
                <div>
                  <h1 className="text-2xl font-bold mb-2">{app.name}</h1>
                  <p><strong>Package Name:</strong> {app.package_name}</p>
                  <p><strong>Category:</strong> {app.category}</p>
                  <p><strong>Sub Category:</strong> {app.sub_category}</p>
                  <p><strong>Points:</strong> {app.points}</p>
                </div>
              </div>
              <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {screenshots.length > 0 && (
                <div className="mt-4">
                  <h2 className="text-lg font-bold mb-2">Uploaded Screenshots:</h2>
                  <ul>
                    {screenshots.map((file, index) => (
                      <li key={index} className="mb-2">{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
