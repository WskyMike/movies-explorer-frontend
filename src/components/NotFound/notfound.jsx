import React from 'react';
import { useNavigate } from 'react-router-dom';

import './notfound.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__text">Страница не найдена</p>
      <button
        className="not-found__button"
        onClick={() => navigate(-1)}
        type="button"
        aria-label="Вернуться на предыдущую страницу"
      >
        Назад
      </button>
    </div>
  );
}

export default NotFound;
