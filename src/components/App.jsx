/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
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
import RequireAuth from '../hooks/requireAuth';
import UnauthRoute from '../hooks/unauthRoute';
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
  // Поиск среди сохраненных фильмов
  const [searchedSaveMovies, setSearchedSaveMovies] = useState([]);
  // Сохраненные фильмы
  const [userSavedMovies, setUserSavedMovies] = useState([]);
  // Валидация формы поиска
  const [formValidation, setFormValidation] = useState(true);
  // Чекбокс короткометражек
  const [isChecked, setIsChecked] = useState(false);
  // Значение поиска
  const [searchValue, setSearchValue] = useState('');
  // Массив всех фильмов
  const [movies, setMovies] = useState([]);
  // Массив найденных фильмов
  const [searchedMovies, setSearchedMovies] = useState(() => {
    const initialData = JSON.parse(localStorage.getItem('searchedMovies'));
    return initialData || '';
  });

  // Таймер загрузки
  function loadingTimer(time = 0) {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, [time]);
  }

  // Обработка запроса из поисковой строки
  useEffect(() => {
    pathname === '/movies'
      ? setSearchValue(localStorage.getItem('searchValueMain') || '')
      : setSearchValue(localStorage.getItem('searchValueSave') || '');
  }, [pathname, searchedMovies]);

  function searchChangeValueHandler(e) {
    setSearchValue(e.target.value);
    setFormValidation(e.target.checkValidity());
    pathname === '/movies'
      ? localStorage.setItem('searchValueMain', e.target.value)
      : localStorage.setItem('searchValueSave', e.target.value);
  }
  // ---

  // При обновлении saved-movies возвращает все фильмы
  useEffect(() => {
    if (pathname === '/saved-movies') {
      localStorage.removeItem('searchValueSave');
      setSearchedSaveMovies(userSavedMovies);
      localStorage.setItem('isCheckSave', JSON.stringify(false));
    }
  }, [pathname]);
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
  const searchMoviesHandler = (movs, filteredMovies) => {
    // setSearchedMovies([]);
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
  };
  // ---

  // Обновить лист фильмов при нажатии на чекбокс
  useEffect(() => {
    if (searchedMovies) { searchMoviesHandler(movies, setSearchedMovies); }
  }, [localStorage.getItem('isCheckMain')]);

  useEffect(() => {
    searchMoviesHandler(userSavedMovies, setSearchedSaveMovies);
  }, [localStorage.getItem('isCheckSave')]);

  // Обработчик поиска
  function searchHandler(e) {
    const valid = e.target.checkValidity();
    e.preventDefault();
    if (!valid) return setFormValidation(valid);
    loadingTimer(1000);
    setFormValidation(valid);
    searchMoviesHandler(movies, setSearchedMovies);
  }

  useEffect(() => {
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
  }, [searchedMovies]);

  useEffect(() => {
    setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
  }, [userSavedMovies, searchValue, pathname]);
  // --

  // Загрузить, отформатировать и сохранить в массив ВСЕ фильмы.
  async function moviesHandler() {
    setIsLoading(true);
    await MoviesApi()
      .then((res) => {
        const formattedCardList = res.map((movie) => validCardFormat(movie));
        localStorage.setItem('movies', JSON.stringify(formattedCardList));
        setMovies(JSON.parse(localStorage.getItem('movies')));
      })
      .finally(() => setIsLoading(false))
      .catch(() => {
        renderToastify(
          'error',
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        );
        localStorage.removeItem('movies');
      });
  }

  useEffect(() => {
    if (pathname === '/movies') {
      moviesHandler();
    }
  }, [loggedIn]);

  // Поиск по сохраненым фильмам
  function savedMoviesSearchHandler(e) {
    e.preventDefault();
    loadingTimer(1000);
    searchMoviesHandler(userSavedMovies, setSearchedSaveMovies);
  }

  useEffect(() => {
    setSearchedSaveMovies(userSavedMovies);
  }, [userSavedMovies]);
  // ---

  // Получить сохраненные фильмы
  function getSavedMovies() {
    MainApi.getSavedMovies(jwt)
      .then((res) => {
        setUserSavedMovies(res);
      })
      .finally(() => setIsLoading(false))
      .catch((err) => {
        renderToastify('error', err.message);
      });
  }

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

  // Получить инфо о пользователе
  function getUserInfo() {
    MainApi.getUserInfo(jwt)
      .then(({ name, email, _id }) => {
        setCurrentUser({ name, email, _id });
      });
  }

  // Авторизация
  function handleLogin(email, password) {
    MainApi.login(email, password)
      .then(() => {
        setLoggedIn(true);
        getUserInfo();
        getSavedMovies();
        navigate('/movies');
        renderToastify('success', 'Добро пожаловать!');
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
    setLoggedIn(false);
    localStorage.clear();
    setSearchedMovies('');
    navigate('/');
  }

  // Получить данные, если loggedIn
  useEffect(() => {
    if (loggedIn === true) {
      MainApi.getUserInfo()
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(pathname);
        });
    }
  }, [loggedIn]);

  function tokenCheck() {
    if (jwt) {
      MainApi.getUserInfo()
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
          getSavedMovies();
          navigate(pathname);
        })
        .catch((err) => {
          renderToastify('error', err.message);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // Обновить юзера
  function handleUpdateUser(name, email) {
    setIsLoading(true);
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
      (item) => item.movieId === movie.id,
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
    <AppContext.Provider
      value={{
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
            <Route
              path="signup"
              element={
                isLoading ? (
                  <Preloader />
                ) : (
                  <UnauthRoute>
                    <Register onRegister={handleRegister} />
                  </UnauthRoute>
                )
              }
            />
            <Route
              path="signin"
              element={
                isLoading ? (
                  <Preloader />
                ) : (
                  <UnauthRoute>
                    <Login onLogin={handleLogin} />
                  </UnauthRoute>
                )
              }
            />
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
                    movies={movies}
                    searchValue={searchValue}
                    searchChangeValueHandler={searchChangeValueHandler}
                    searchHandler={searchHandler}
                    likeMovie={likeMovie}
                    removeMovie={removeMovie}
                    isLoading={isLoading}
                    formValidation={formValidation}
                    searchedMovies={searchedMovies}
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
