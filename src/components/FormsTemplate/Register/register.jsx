import React from 'react';

import Auth from '../../Auth/auth';
import Input from '../../Input/input';

function Registration() {
  return (
    <Auth
      formName="registration"
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
    >
      <Input
        title="Имя"
        name="username"
        type="text"
        className="input input_type_auth"
        addClassName="input_display_block"
        id="username"
        minLength="2"
        maxLength="40"
        required
      />
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
      />
    </Auth>
  );
}

export default Registration;
