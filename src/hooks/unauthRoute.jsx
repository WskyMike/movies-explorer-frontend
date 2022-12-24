import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import AppContext from '../Contexts/AppContext';

function UnauthRoute({ children }) {
  const { loggedIn } = useContext(AppContext);

  return (
    loggedIn
      ? <Navigate to="/movies" />
      : children
  );
}

export default UnauthRoute;
