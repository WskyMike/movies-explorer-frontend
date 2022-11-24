/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';

import './input.scss';

function Input({ ...props }) {
  const { pathname } = useLocation();

  return (
    <div className={`input__container ${props.addClassName}`}>
      <span className="input__title">{props.title}</span>
      <input
        className={`${props.className} ${
          props.errorMessage ? 'input_error' : ''
        }`}
        name={props.name}
        type={props.type}
        // id={props.id}
        required
        minLength={props.minLength}
        maxLength={props.maxLenght}
        value={props.value || ''}
        onChange={props.onChange}
        pattern={props.pattern}
        onBlur={props.onBlur}
      />
      <p
        className={
          pathname === '/profile'
            ? 'input-error input-error__profile'
            : 'input-error'
        }
      >
        {props.errorMessage}
      </p>
    </div>
  );
}

export default Input;
