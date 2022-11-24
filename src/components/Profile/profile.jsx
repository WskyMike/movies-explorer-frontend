/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import AppContext from '../../Contexts/AppContext';
import Preloader from '../../vendor/Preloader/Preloader';

import './profile.scss';

function Profile({ ...props }) {
  const { isLoading } = useContext(AppContext);

  return (
    <div className="profile">
      <h1 className="profile__title">
        Привет,&nbsp;
        {props.title}
        !
      </h1>
      {isLoading ? <Preloader /> : (
        <form
          className="profile__form"
          name={props.formName}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            className="profile__button profile__button-submit"
            type="submit"
            aria-label="Редактировать данные"
          >
            {props.SubmitBtnText}
          </button>
          <button
            className="profile__button profile__button-exit"
            type="button"
            aria-label="Выйти из аккаунта"
            onClick={props.handleLogout}
            disabled={!!isLoading}
          >
            {props.ExitBtnText}
          </button>
        </form>
      ) }
    </div>
  );
}

export default Profile;
