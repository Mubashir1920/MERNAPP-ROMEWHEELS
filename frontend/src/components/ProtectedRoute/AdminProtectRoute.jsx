import React from 'react';
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectRoute = ({ children }) => {
  
  const { isLoggedIn, user } = useSelector((state) => state);

  if (!isLoggedIn || !user || user.fullname !== 'admin') {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminProtectRoute;
