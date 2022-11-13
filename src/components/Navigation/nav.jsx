/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../Contexts/AppContext';

import './nav.scss';
import ToProfileIcon from '../../images/to-profile-icon.svg';

function Navigation({ onBurgerClose }) {
  const stateMenu = useContext(AppContext);
  const menuOpen = stateMenu ? 'nav_open' : '';

  function handleClickLink(e) {
    if (e.currentTarget.className.includes('active')) {
      return;
    }
    onBurgerClose();
  }

  const activeClassName = ({ isActive }) => `nav__link ${isActive ? ' active' : ''}`;

  return (
    <nav className={`nav ${menuOpen}`}>
      <ul className="nav__list">
        <li className="nav__item nav__item_invisible">
          <NavLink
            className={activeClassName}
            to="/"
            end
            aria-label="На главную"
            onClick={handleClickLink}
          >
            Главная
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className={activeClassName}
            to="movies"
            aria-label="Фильмы"
            onClick={handleClickLink}
          >
            Фильмы
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink
            className={activeClassName}
            to="saved-movies"
            aria-label="Сохранённые фильмы"
            onClick={handleClickLink}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="profile"
        className={({ isActive }) => `nav__link nav__profile ${isActive ? ' active' : ''}`}
        aria-label="Аккаунт"
        onClick={handleClickLink}
      >
        Аккаунт
        <img className="nav__icon" src={ToProfileIcon} alt="иконка профиль" />
      </NavLink>
    </nav>
  );
}

export default Navigation;

// nav_open
