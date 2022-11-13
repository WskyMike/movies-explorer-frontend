/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AppContext from '../Contexts/AppContext';

import Overlay from './Overlay/overlay';
import Main from './Main/main';
import Header from './Header/header';
import Footer from './Footer/footer';
import Movies from './Movies/movies';
import SavedMovies from './SavedMovies/savedmovies';
import Login from './FormsTemplate/Login/login';
import Register from './FormsTemplate/Register/register';
import NotFound from './NotFound/notfound';
import UserEdit from './FormsTemplate/UserEdit/useredit';

function App() {
  const [stateMenu, setStateMenu] = useState(false);

  // Открыть бургер-меню
  function handleClickBurger() {
    setStateMenu(!stateMenu);
  }
  // Закрыть бургер-меню
  function handleBurgerClose() {
    setStateMenu(false);
  }

  return (
    <AppContext.Provider value={stateMenu}>
      <div className="app">
        <Overlay />
        <Header
          onBurgerClose={handleBurgerClose}
          onClickBurger={handleClickBurger}
        />
        <Routes>
          <Route path="signup" element={<Register />} />
          <Route path="signin" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="profile" element={<UserEdit />} />
          <Route path="movies" element={<Movies />} />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
