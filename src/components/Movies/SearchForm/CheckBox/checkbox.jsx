import React, { useContext } from 'react';
import AppContext from '../../../../Contexts/AppContext';

import './checkbox.scss';

function CheckBox() {
  const { checkBoxHandler, isChecked } = useContext(AppContext);

  return (
    <label className="checkbox__wrapper">
      <input
        className="checkbox__switch"
        type="checkbox"
        checked={isChecked || false}
        onChange={checkBoxHandler}
      />
      <span className="checkbox__switch-cover" />
      <span className="checkbox__text">Короткометражки</span>
    </label>
  );
}

export default CheckBox;
