/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

// Context
import AppContext from '../Contexts/AppContext';
import CurrentUserContext from '../Contexts/CurrentUserContext';
import RequireAuth from '../hooks/RequireAuth';
import MoviesApi from '../utils/MoviesApi';
import validCardFormat from '../utils/validCardFormat';

// APIs
import MainApi from '../utils/MainApi';

// Components
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
import Preloader from '../vendor/Preloader/Preloader';
import { Toastify, renderToastify } from '../vendor/Toastify/toastify';

function App() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [stateMenu, setStateMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [searchedSaveMovies, setSearchedSaveMovies] = useState([]);
  const [userSavedMovies, setUserSavedMovies] = useState([]);
  // Валидация формы поиска
  const [formValidation, setFormValidation] = useState(true);
  // Чекбокс короткометражек
  const [isChecked, setIsChecked] = useState(false);
  // Значение поиска
  const [searchValue, setSearchValue] = useState('');
  // Массив фильмов
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState(movies);

  // console.log(movies);

  // Таймер загрузки
  function loadingTimer(time = 0) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, [time]);
  }

  // Загрузить, отформатировать и сохранить в массив ВСЕ фильмы.
  async function moviesHandler() {
    if (loggedIn) {
      setIsLoading(true);
      await MoviesApi()
        .then((res) => {
          const formattedCardList = res.map((movie) => validCardFormat(movie));
          localStorage.setItem('movies', JSON.stringify(formattedCardList));
          setMovies(JSON.parse(localStorage.getItem('movies')));
        })
        .finally(() => setIsLoading(false))
        .catch(() => {
          renderToastify('error', 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          localStorage.removeItem('movies');
        });
    }
  }

  useEffect(() => {
    moviesHandler();
  }, [loggedIn]);
  // ---

  // Обработка запроса из поисковой строки
  useEffect(() => {
    pathname === '/movies'
      ? setSearchValue(localStorage.getItem('searchValueMain') || '')
      : setSearchValue(localStorage.getItem('searchValueSave') || '');
  }, [pathname]);

  function searchChangeValueHandler(e) {
    setSearchValue(e.target.value);
    setFormValidation(e.target.checkValidity());
    pathname === '/movies'
      ? localStorage.setItem('searchValueMain', e.target.value)
      : localStorage.setItem('searchValueSave', e.target.value);
  }
  // ---

  // Отслеживание изменений в чекбоксе
  useEffect(() => {
    pathname === '/movies'
      ? setIsChecked(JSON.parse(localStorage.getItem('isCheckMain')))
      : setIsChecked(JSON.parse(localStorage.getItem('isCheckSave')));
  }, [isChecked, pathname]);

  function checkBoxHandler() {
    loadingTimer(1000);
    setIsChecked(!isChecked);
    pathname === '/movies'
      ? localStorage.setItem('isCheckMain', JSON.stringify(!isChecked))
      : localStorage.setItem('isCheckSave', JSON.stringify(!isChecked));
  }
  // ---

  // Обработчик поиска фильмов
  function searchMoviesHandler(movs, filteredMovies) {
    isChecked
      ? filteredMovies(
        movs.filter(
          (movie) => movie.duration <= 40
            && movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
            && movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      )
      : filteredMovies(
        movs.filter(
          (movie) => movie.nameRU.toLowerCase().includes(searchValue.toLowerCase())
            && movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
  }
  // ---

  // Обработчик поиска
  useEffect(() => {
    setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
  }, []);

  useEffect(() => {
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
  }, [movies, searchedMovies]);

  function searchHandler(e) {
    const valid = e.target.checkValidity();
    e.preventDefault();
    if (!valid) return setFormValidation(valid);
    loadingTimer(1000);
    setFormValidation(valid);
    searchMoviesHandler(movies, setSearchedMovies);
  }
  // --

  // Обновить лист фильмов при нажатии на чекбокс
  useEffect(() => {
    searchMoviesHandler(movies, setSearchedMovies);
    searchMoviesHandler(userSavedMovies, setSearchedSaveMovies);
  }, [isChecked]);

  // Поиск по сохраненым фильмам
  useEffect(() => {
    setSearchedSaveMovies(userSavedMovies);
  }, [userSavedMovies]);

  function savedMoviesSearchHandler(e) {
    e.preventDefault();
    searchMoviesHandler(userSavedMovies, setSearchedSaveMovies);
  }
  // ---

  // Cохранение фильма
  function likeMovie(movie) {
    MainApi.setSavedMovies(movie, jwt)
      .then((res) => {
        setUserSavedMovies([...userSavedMovies, res]);
      })
      .catch((err) => {
        renderToastify('error', err.message);
      });
  }
  // ---

  // Проверка токена
  function authCheck() {
    if (jwt) {
      MainApi.getUserInfo(jwt);
      MainApi.getSavedMovies(jwt)
        .then((data) => {
          setLoggedIn(true);
          setUserSavedMovies(data);
          navigate(pathname);
        });
    }
  }

  useEffect(() => {
    authCheck();
  }, [loggedIn]);

  // Получить инфо о пользователе
  function getUserInfo() {
    MainApi.getUserInfo(jwt)
      .then(({ name, email, _id }) => {
        setCurrentUser({ name, email, _id });
      });
  }

  useEffect(() => {
    if (loggedIn === false) {
      return;
    }
    getUserInfo();
  }, [loggedIn]);

  // Авторизация
  function handleLogin(email, password) {
    MainApi.login(email, password)
      .then(() => {
        setLoggedIn(true);
        getUserInfo();
        navigate('/movies');
        renderToastify('success', 'Добро пожалавать!');
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        renderToastify('error', err.message);
      });
  }

  // Регистраця
  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        renderToastify('error', err.message);
      });
  }

  // Выход
  function handleLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('searchedMovies');
    setSearchedMovies(null);
    localStorage.removeItem('searchValueMain');
    localStorage.removeItem('searchValueSave');
    localStorage.removeItem('isCheckMain');
    localStorage.removeItem('isCheckSave');
    setLoggedIn(false);
    navigate('/');
  }

  // Обновить юзера
  function handleUpdateUser(name, email) {
    MainApi.updateUserInfo(name, email)
      .then(({ name, email }) => {
        renderToastify('success', 'Данные обновлены!');
        setCurrentUser({ name, email });
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        renderToastify('error', err.message);
      });
  }

  // Открыть бургер-меню
  function handleClickBurger() {
    setStateMenu(!stateMenu);
  }
  // Закрыть бургер-меню
  function handleBurgerClose() {
    setStateMenu(false);
  }

  // Удаление фильма из сохранения
  function removeMovie(movie) {
    const isOwner = movie.owner === currentUser._id;
    const idLikedMovie = userSavedMovies.find(
      ((item) => item.movieId === movie.id),
    );

    if (isOwner || idLikedMovie._id) {
      MainApi.deleteSavedMovie(
        movie._id || idLikedMovie._id,
        localStorage.getItem('jwt'),
      )
        .then(() => {
          setUserSavedMovies(
            userSavedMovies.filter(
              (i) => i._id !== (movie._id || idLikedMovie._id),
            ),
          );
        })
        .catch((err) => {
          renderToastify('error', err.message);
        });
    }
  }

  return (
    <AppContext.Provider value={{
      stateMenu,
      loggedIn,
      loadingTimer,
      isLoading,
      setIsLoading,
      userSavedMovies,
      isChecked,
      checkBoxHandler,
    }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Overlay />
          <Toastify />
          <Header
            onBurgerClose={handleBurgerClose}
            onClickBurger={handleClickBurger}
          />
          <Routes>
            <Route path="signup" element={isLoading ? <Preloader /> : <Register onRegister={handleRegister} />} />
            <Route path="signin" element={isLoading ? <Preloader /> : <Login onLogin={handleLogin} />} />
            <Route path="/" element={<Main />} />
            <Route
              path="profile"
              element={(
                <RequireAuth>
                  <UserEdit
                    onUpdateUser={handleUpdateUser}
                    handleLogout={handleLogout}
                  />
                </RequireAuth>
              )}
            />
            <Route
              path="movies"
              element={(
                <RequireAuth>
                  <Movies
                    checkBoxHandler={checkBoxHandler}
                    searchValue={searchValue}
                    searchChangeValueHandler={searchChangeValueHandler}
                    searchHandler={searchHandler}
                    likeMovie={likeMovie}
                    removeMovie={removeMovie}
                    isLoading={isLoading}
                    formValidation={formValidation}
                    searchedMovies={
                      searchedMovies == null ? movies : searchedMovies
                    }
                  />
                </RequireAuth>
              )}
            />
            <Route
              path="saved-movies"
              element={(
                <RequireAuth>
                  <SavedMovies
                    searchValue={searchValue}
                    searchChangeValueHandler={searchChangeValueHandler}
                    checkBoxHandler={checkBoxHandler}
                    searchedMovies={searchedSaveMovies}
                    searchHandler={savedMoviesSearchHandler}
                    removeMovie={removeMovie}
                    isLoading={isLoading}
                    formValidation={formValidation}
                  />
                </RequireAuth>
              )}
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
