/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AppContext from '../Contexts/AppContext';

function RequireAuth({ children }) {
  const { loggedIn } = useContext(AppContext);
  const location = useLocation();

  if (!loggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
