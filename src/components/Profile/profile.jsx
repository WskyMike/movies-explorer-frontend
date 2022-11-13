/* eslint-disable react/prop-types */
import React from 'react';

import './profile.scss';

function Profile({ ...props }) {
  return (
    <div className="profile">
      <h1 className="profile__title">{props.title}</h1>
      <form
        className="profile__form"
        name={props.formName}
        onSubmit={props.onSubmit}
        method="get"
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
        >
          {props.ExitBtnText}
        </button>
      </form>
    </div>
  );
}

export default Profile;
