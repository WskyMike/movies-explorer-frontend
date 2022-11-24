import React, { useContext, useEffect } from 'react';
import CurrentUserContext from '../../../Contexts/CurrentUserContext';
import AppContext from '../../../Contexts/AppContext';

import Profile from '../../Profile/profile';
import Input from '../../Input/input';
import useFormValidation from '../../../hooks/useFormValidation';
import { renderToastify } from '../../../vendor/Toastify/toastify';

function UserEdit({ ...props }) {
  const REGEX_EMAIL = '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$';
  const { name, email } = useContext(CurrentUserContext);
  const { setIsLoading } = useContext(AppContext);
  const {
    values,
    setValues,
    valid,
    errorMessages,
    onChange,
    onBlur,
  } = useFormValidation();

  useEffect(() => {
    setValues({ name, email });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (name === values.name && email === values.email) {
      return renderToastify('info', 'Внесите изменения в соответствующие поля.');
    }

    if (!valid) {
      return;
    }

    setIsLoading(true);
    props.onUpdateUser(values.name, values.email);
  }

  return (
    <Profile
      formName="useredit"
      title={name}
      SubmitBtnText="Редактировать"
      ExitBtnText="Выйти из аккаунта"
      handleLogout={props.handleLogout}
      onSubmit={handleSubmit}
    >
      <Input
        title="Имя"
        name="name"
        type="text"
        className="input input_type_useredit"
        id="name"
        minLength="2"
        maxLength="40"
        value={values.name}
        onChange={onChange}
        autocompite="off"
        onBlur={onBlur}
        errorMessage={errorMessages.name}
        required
      />
      <Input
        title="E-mail"
        name="email"
        type="email"
        className="input input_type_useredit"
        id="email"
        minLength="6"
        maxLength="40"
        value={values.email}
        onChange={onChange}
        errorMessage={errorMessages.email}
        autocompite="off"
        onBlur={onBlur}
        pattern={REGEX_EMAIL}
        required
      />
    </Profile>
  );
}

export default UserEdit;
