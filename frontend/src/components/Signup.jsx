import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    let is_staff = false;
    console.log(username)
    if(username.includes('_admin')){
      is_staff = true;
      console.log()
    }

    await axios.post('/users/', { username, email, password , is_staff});
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-2 w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
