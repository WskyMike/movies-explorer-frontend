/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Navigation from '../Navigation/nav';
import VisitorNav from '../VisitorNav/visitornav';
import HeaderLogo from '../../images/logo.svg';
import Burger from './Burger/burger';
import './header.scss';

function Header({ onBurgerClose, onClickBurger }) {
  const { pathname } = useLocation();
  if (pathname === '/signin' || pathname === '/signup' || pathname === '/404') return null;

  const loggedIn = pathname !== '/';
  const headerOnLanding = loggedIn ? '' : 'header_landing-color';

  return (
    <header className={`header ${headerOnLanding}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="logo_img" src={HeaderLogo} alt="Лого" />
        </Link>
        {loggedIn ? <Navigation onBurgerClose={onBurgerClose} /> : <VisitorNav />}
        {loggedIn && <Burger handleClickBurger={onClickBurger} />}
      </div>
    </header>
  );
}

export default Header;
