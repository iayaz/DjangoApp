import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from './axiosConfig';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        const response = await axios.get('/users/me/');
        setIsAuthenticated(true);
        setUserRole(response.data.is_staff ? 'admin' : 'user');
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
