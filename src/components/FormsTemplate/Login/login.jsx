/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
import React, { useContext, useEffect } from 'react';
// import AppContext from '../../../Contexts/AppContext';

import Auth from '../../Auth/auth';
import Input from '../../Input/input';
import useFormValidation from '../../../hooks/useFormValidation';
import AppContext from '../../../Contexts/AppContext';

function login({ ...props }) {
  const REGEX_EMAIL = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';
  const { setIsLoading } = useContext(AppContext);
  const {
    values,
    setValues,
    valid,
    errorMessages,
    setErrorMessages,
    onChange,
    onBlur,
  } = useFormValidation();

  function onSubmit(e) {
    e.preventDefault();
    const inputInvalid = [];

    if (!valid) {
      for (let name in values) {
        if (values[name].length <= 0) {
          inputInvalid[name] = 'Заполните это поле.';
        }
      }

      setErrorMessages({ ...errorMessages, ...inputInvalid });
      return;
    }

    setIsLoading(true);
    props.onLogin(values.email, values.password);
  }

  useEffect(() => {
    setValues({ email: '', password: '' });
  }, []);

  return (
    <Auth
      formName="login"
      title="Рады видеть!"
      btnText="Войти"
      onSubmit={onSubmit}
      valid={valid}
    >
      <Input
        title="E-mail"
        name="email"
        type="email"
        className="input input_type_auth"
        addClassName="input_display_block"
        id="email"
        minLength="6"
        maxLength="40"
        required
        pattern={REGEX_EMAIL}
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessages.email}
      />
      <Input
        title="Пароль"
        name="password"
        type="password"
        className="input input_type_auth"
        addClassName="input_display_block"
        id="password"
        minLength="6"
        maxLength="40"
        required
        value={values.password}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessages.password}
      />
    </Auth>
  );
}

export default login;
