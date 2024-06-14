import React from 'react';
import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddApp from './components/AddApp';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import UserProfile from './components/UserProfile';
import UserPoints from './components/UserPoints';
import UserTasks from './components/UserTasks';
import TaskDetail from './components/TaskDetail';
import AppDetails from './components/AppDetails';
import ProtectedRoute from './protectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/addapp" element={<ProtectedRoute requiredRole="admin"><AddApp /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminHome /></ProtectedRoute>} />
        <Route path="/user/home" element={<ProtectedRoute requiredRole="user"><UserHome /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute requiredRole="user"><UserProfile /></ProtectedRoute>} />
        <Route path="/user/points" element={<ProtectedRoute requiredRole="user"><UserPoints /></ProtectedRoute>} />
        <Route path="/user/tasks" element={<ProtectedRoute requiredRole="user"><UserTasks /></ProtectedRoute>} />
        <Route path="/task/:id" element={<ProtectedRoute requiredRole="user"><TaskDetail /></ProtectedRoute>} />
        <Route path="/user/apps/:id" element={<ProtectedRoute requiredRole="user"><AppDetails /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
