const BASE_URL = 'https://api.moviesexplorer.webtm.ru';

// const authorization = "Bearer " + localStorage.getItem("jwt"), --------------------------!

//  Проверить ответ
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return res.json()
    .then((data) => {
      throw new Error(data.message);
    });
}

// Регистрация
function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(checkResponse);
}

// Авторизация
function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data.token;
    });
}

// Получить инфо о пользователе
function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
}

// Обновить инфо о пользоваеле
function updateUserInfo(name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(checkResponse);
}

// Сохранить фильм
function setSavedMovies(movie) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.image,
      movieId: movie.id,
    }),
  }).then(checkResponse);
}

// Получить сохраненные фильмы
function getSavedMovies() {
  return fetch(`${BASE_URL}/movies/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
}

// Удалить сохраненный фильм
function deleteSavedMovie(movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
}

const MainApi = {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  setSavedMovies,
  getSavedMovies,
  deleteSavedMovie,
};

export default MainApi;
