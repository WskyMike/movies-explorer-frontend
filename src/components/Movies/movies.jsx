import React from 'react';

import Search from './SearchForm/searchform';
import MoviesCardsList from './MoviesCardsList/moviescardslist';
// import ActionButtonLike from './MoviesCard/ActionButtonLike/buttonlike';
import './movies.scss';

function Movies() {
  return (
    <main className="movies">
      <Search />
      <MoviesCardsList />
      <button className="movies__more-button" type="button">Ещё</button>
    </main>
  );
}

export default Movies;
