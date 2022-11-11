/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import HeaderLogo from '../../images/logo.svg';
import './auth.scss';

function Auth({ ...props }) {
  return (
    <div className="auth">
      <Link className="auth__link" to="/">
        <img className="logo_img" src={HeaderLogo} alt="Лого" />
      </Link>
      <h1 className="auth__title">{props.title}</h1>
      <form
        className="auth__form"
        name={props.formName}
        onSubmit={props.onSubmit}
        noValidate
        method="get"
      >
        {props.children}
        <button className="auth__submit-button" type="submit">
          {props.btnText}
        </button>
      </form>
      {props.formName === 'registration' ? (
        <p className="auth__footer">
          Уже зарегистрированы?
          <Link className="auth__link" to="/signin">
            Войти
          </Link>
        </p>
      ) : (
        <p className="auth__footer">
          Еще не зарегистрированы?
          <Link className="auth__link" to="/signup">
            Регистрация
          </Link>
        </p>
      )}
    </div>
  );
}

export default Auth;
