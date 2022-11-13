/* eslint-disable react/prop-types */
import React from 'react';

import './input.scss';

function Input({ ...props }) {
  return (
    <div className={`input__container ${props.addClassName}`}>
      <span className="input__title">{props.title}</span>
      <input
        className={`${props.className}`}
        name={props.name}
        type={props.type}
        //   value={value || ''}
        id={props.id}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLenght}
        value={props.value}
      />
      {/* <p className="input-error">{props.errorMessage}</p> */}
    </div>
    // </div>
  );
}

export default Input;
