import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`/tasks/${id}/`);
      setTask(response.data);
    };
    fetchTask();
  }, [id]);

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('screenshot', screenshot);
    formData.append('completed', true);
    await axios.patch(`/tasks/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">{task.app && task.app.name}</h1>
        <p>{task.app && task.app.package_name}</p>
        <p>{task.app && task.app.category}</p>
        <p>{task.app && task.app.sub_category}</p>
        <p>{task.completed ? 'Task Completed' : 'Task Incomplete'}</p>
        {!task.completed && (
          <form onSubmit={handleSubmit} className="mt-4">
            <input type="file" onChange={handleScreenshotChange} className="mb-4" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
