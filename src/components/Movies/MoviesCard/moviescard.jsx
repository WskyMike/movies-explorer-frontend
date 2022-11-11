/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router-dom';

import './moviescard.scss';
import TestImg from '../../../images/movie-test-img2.jpg';
import ActionButtonLike from './ActionButtonLike/buttonlike';
import ActionButtonDelete from './ActionButtonDelete/buttondelete';

function MoviesCard() {
  const { pathname } = useLocation();
  const isSavedMovies = pathname !== '/movies';

  return (
    <article className="movie">
      <div className="movie__cover">
        <a href="#" target="_blank" rel="noreferrer">
          <img className="movie__image" src={TestImg} alt="Название фильма" />
        </a>
      </div>
      <div className="movie__footer">
        <div className="movie__data">
          <h2 className="movie__name">Название фильма</h2>
          {isSavedMovies ? <ActionButtonDelete /> : <ActionButtonLike />}
        </div>
        <div className="movie__meta">
          <span className="movie__duration">1ч 30м</span>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
