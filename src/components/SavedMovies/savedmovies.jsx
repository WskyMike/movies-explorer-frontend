import React from 'react';

import Search from '../Movies/SearchForm/searchform';
import MoviesCardsList from '../Movies/MoviesCardsList/moviescardslist';
// import ActionButtonDelete from '../Movies/MoviesCard/ActionButtonDelete/buttondelete';
import './savedmovies.scss';

function SavedMovies() {
  return (
    <main className="saved-movies">
      <Search />
      <MoviesCardsList />
      <button className="movies__more-button" type="button">Ещё</button>
    </main>
  );
}

export default SavedMovies;
