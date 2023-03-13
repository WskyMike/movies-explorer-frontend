/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';

import Auth from '../../Auth/auth';
import Input from '../../Input/input';
import useFormValidation from '../../../hooks/useFormValidation';
import AppContext from '../../../Contexts/AppContext';

function Registration({ ...props }) {
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
    props.onRegister(values.name, values.email, values.password);
  }

  useEffect(() => {
    setValues({ name: '', email: '', password: '' });
  }, []);

  return (
    <Auth
      formName="registration"
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      onSubmit={onSubmit}
      valid={valid}
    >
      <Input
        title="Имя"
        name="name"
        type="text"
        className="input input_type_auth"
        addClassName="input_display_block"
        // id="username"
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessages.name}
        required
      />
      <Input
        title="E-mail"
        name="email"
        type="email"
        className="input input_type_auth"
        addClassName="input_display_block"
        // id="email"
        minLength="6"
        maxLength="40"
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
        pattern={REGEX_EMAIL}
        errorMessage={errorMessages.email}
        required
      />
      <Input
        title="Пароль"
        name="password"
        type="password"
        className="input input_type_auth"
        addClassName="input_display_block"
        // id="password"
        minLength="6"
        maxLength="40"
        value={values.password || ''}
        onChange={onChange}
        onBlur={onBlur}
        errorMessage={errorMessages.password}
        required
      />
    </Auth>
  );
}

export default Registration;
