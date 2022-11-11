import React from 'react';
import { Link } from 'react-router-dom';

import './visitornav.scss';

function VisitorNav() {
  return (
    <div className="visitor__login">
      <Link to="/signup" className="visitor__login-link">
        Регистрация
      </Link>
      <Link to="/signin" className="visitor__login-link">
        Войти
      </Link>
    </div>
  );
}

export default VisitorNav;
