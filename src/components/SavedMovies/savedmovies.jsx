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
        isChecked={props.isChecked}
        checkBoxHandler={props.checkBoxHandler}
        formValidation={props.formValidation}
      />
      <MoviesCardsList
        searchedMovies={props.searchedMovies}
        searchValue={props.searchValue}
        removeMovie={props.removeMovie}
        isLoading={props.isLoading}
      />
    </main>
  );
}

export default SavedMovies;
