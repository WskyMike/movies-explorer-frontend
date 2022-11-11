import React from 'react';

import Profile from '../../Profile/profile';
import Input from '../../Input/input';

function UserEdit() {
  return (
    <Profile
      formName="useredit"
      title="Привет, Username!"
      SubmitBtnText="Редактировать"
      ExitBtnText="Выйти из аккаунта"
    >
      <Input
        title="Имя"
        name="name"
        type="text"
        className="input input_type_useredit"
        id="name"
        minLength="2"
        maxLength="40"
        required
        value="Username"
      />
      <Input
        title="E-mail"
        name="email"
        type="email"
        className="input input_type_useredit"
        id="email"
        minLength="6"
        maxLength="40"
        required
        value="mail@mail.ru"
      />
    </Profile>
  );
}

export default UserEdit;
