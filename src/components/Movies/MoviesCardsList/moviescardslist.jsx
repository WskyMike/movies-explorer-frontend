import React from 'react';
import MoviesCard from '../MoviesCard/moviescard';
import './moviescardslist.scss';

function MoviesCardsList() {
  return (
    <section className="movies-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  );
}

export default MoviesCardsList;
