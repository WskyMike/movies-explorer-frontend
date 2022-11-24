import React from 'react';

import Search from './SearchForm/searchform';
import MoviesCardsList from './MoviesCardsList/moviescardslist';

import './movies.scss';

function Movies({ ...props }) {
  return (
    <main className="movies">
      <Search
        searchValue={props.searchValue}
        searchChangeValueHandler={props.searchChangeValueHandler}
        searchHandler={props.searchHandler}
        formValidation={props.formValidation}
      />
      {props.searchedMovies.length === 0 && (
        <p className="movies_list-empty">Ничего не найдено</p>
      )}
      <MoviesCardsList
        searchedMovies={props.searchedMovies}
        searchValue={props.searchValue}
        likeMovie={props.likeMovie}
        removeMovie={props.removeMovie}
        isLoading={props.isLoading}
      />
    </main>
  );
}

export default Movies;
