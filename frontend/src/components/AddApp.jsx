import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Link } from 'react-router-dom';

const AddApp = () => {
  const [name, setName] = useState('');
  const [packageName, setPackageName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [points, setPoints] = useState(0);
  const [categories] = useState(['Entertainment', 'Music', 'Games']);
  const [subCategories] = useState(['Social Media', 'Players', 'Creativity']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/apps/', {
      name,
      package_name: packageName,
      category,
      sub_category: subCategory,
      points,
    });
  };

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
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">App Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="App Name" className="mt-2 w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Package Name</label>
                <input type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)} placeholder="Package Name" className="mt-2 w-full p-2 border border-gray-300 rounded" />
              </div>
              <div>
                <label className="block text-gray-700">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded">
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Sub Category</label>
                <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="mt-2 w-full p-2 border border-gray-300 rounded">
                  <option value="">Select Subcategory</option>
                  {subCategories.map((subCat, index) => (
                    <option key={index} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Points</label>
              <input type="number" value={points} onChange={(e) => setPoints(parseInt(e.target.value))} placeholder="Points" className="mt-2 w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add App</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApp;
