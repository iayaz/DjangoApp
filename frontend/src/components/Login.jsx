import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/token/', { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
    
    const userResponse = await axios.get('/users/me/');
    if (userResponse.data.is_staff == true) {
      navigate('/admin');
    } else {
      navigate('/user/home');
    }
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        <button type="button" onClick={goToSignUp} className="bg-green-500 text-white py-2 px-4 rounded mt-4">Sign Up</button>
      </form>
    </div>
  );
};

export default Login;
