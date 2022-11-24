/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
// import { } from 'react-router-dom';
import AppContext from '../../../Contexts/AppContext';

import './moviescard.scss';

function MoviesCard({ ...props }) {
  // Форматирование времени длительности
  const durationHours = Math.floor(props.movie.duration / 60);
  const durationMinutes = props.movie.duration - durationHours * 60;
  const durationString = durationHours
    ? `${durationHours}ч ${durationMinutes}м`
    : `${durationMinutes}мин`;
  //  --

  const { userSavedMovies } = useContext(AppContext);
  const userSavedMoviesId = userSavedMovies.map((i) => i.movieId);
  const [isSaved, setIsSaved] = useState();

  function handelLikeMovie() {
    props.likeMovie(props.movie);
  }

  function handelRemoveMovie() {
    props.removeMovie(props.movie);
  }

  useEffect(() => {
    if (userSavedMoviesId && userSavedMoviesId.includes(props.movie.id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [userSavedMoviesId, props.movie.id]);

  return (
    <article className="movie">
      <div className="movie__cover">
        <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="movie__image"
            src={props.movie.image}
            alt={props.movie.nameRU}
          />
        </a>
      </div>
      <div className="movie__footer">
        <div className="movie__data">
          <h2 className="movie__name">{props.movie.nameRU}</h2>
          {!props.movie.owner && !isSaved && (
            <button
              className="button-card-like"
              type="button"
              aria-label="сохранить фильм"
              onClick={handelLikeMovie}
            />
          )}

          {!props.movie.owner && isSaved && (
            <button
              className="button-card-like button-card-like_active"
              type="button"
              aria-label="удалить фильм"
              onClick={handelRemoveMovie}
            />
          )}

          {props.movie.owner && (
            <button
              className="button-card-delete"
              type="button"
              aria-label="удалить фильм"
              onClick={handelRemoveMovie}
            />
          )}
        </div>
        <div className="movie__meta">
          <span className="movie__duration">{durationString}</span>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
