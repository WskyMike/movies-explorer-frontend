/* eslint-disable react/prop-types */
import React from 'react';

import Search from '../Movies/SearchForm/searchform';
import MoviesCardsList from '../Movies/MoviesCardsList/moviescardslist';
import './savedmovies.scss';

function SavedMovies({ ...props }) {
  return (
    <main className="saved-movies">
      <Search
        searchValue={props.searchValue}
        searchChangeValueHandler={props.searchChangeValueHandler}
        searchHandler={props.searchHandler}
        formValidation={props.formValidation}
      />
      {props.searchedMovies.length === 0 ? (
        <p className="movies_list-notfound">Ничего не найдено</p>
      ) : (
        <MoviesCardsList
          searchedMovies={props.searchedMovies}
          searchValue={props.searchValue}
          removeMovie={props.removeMovie}
          isLoading={props.isLoading}
        />
      )}
    </main>
  );
}

export default SavedMovies;
