/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import './checkbox.scss';

function ShortFilms() {
  return (
    <label className="checkbox__wrapper">
      <input
        className="checkbox__switch"
        type="checkbox"
        name="shortfilms"
        aria-label="чек-бокс короткометражки"
      />
      <span className="checkbox__switch-cover" />
      <span className="checkbox__text">Короткометражки</span>
    </label>
  );
}

export default ShortFilms;
