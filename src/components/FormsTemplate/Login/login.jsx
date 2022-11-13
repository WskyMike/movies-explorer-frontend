import React from 'react';

import Auth from '../../Auth/auth';
import Input from '../../Input/input';

function login() {
  return (
    <Auth formName="login" title="Рады видеть!" btnText="Войти">
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

export default login;
