/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import AppContext from '../../../Contexts/AppContext';

import './burger.scss';

function Burger({ handleClickBurger }) {
  const stateMenu = useContext(AppContext);
  const isOpen = stateMenu ? 'burger_active' : '';

  return (
    <div className={`burger ${isOpen}`} onClick={handleClickBurger}>
      <span className="burger__item" />
      <span className="burger__item" />
      <span className="burger__item" />
    </div>
  );
}

export default Burger;

// burger_active
