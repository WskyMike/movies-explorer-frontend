/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/moviescard';
import Preloader from '../../../vendor/Preloader/Preloader';
import './moviescardslist.scss';

function MoviesCardsList({ ...props }) {
  const windowInnerWidth = window.innerWidth;
  const [renderMoviesCount, setRenderMoviesCount] = useState(0);
  const [renderButtonMore, setRenderButtonMore] = useState(0);
  const [windowWidth, setWindowWidth] = useState(windowInnerWidth);
  const [isEmpty, setIsEmpty] = useState(true);

  let resizeTimeout = null;

  function updateWindowWidth() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => setWindowWidth(windowInnerWidth), 1500);
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);

    return () => window.removeEventListener('resize', updateWindowWidth);
  });

  function handleMoreClick() {
    const moreMoviesCount = windowWidth >= 1280 ? 3 : windowWidth >= 600 ? 2 : 1;
    setRenderMoviesCount(renderMoviesCount + moreMoviesCount);
  }

  useEffect(() => {
    setRenderMoviesCount(windowWidth >= 1280 ? 12 : windowWidth >= 600 ? 8 : 5);
  }, [windowWidth]);

  useEffect(() => {
    const check = props.searchedMovies
      ? renderMoviesCount < props.searchedMovies.length
      : false;
    setRenderButtonMore(check);
  }, [props.searchedMovies, renderMoviesCount]);

  useEffect(() => {
    if (props.searchedMovies.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [props.searchedMovies]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <>
          {isEmpty ? (<p className="movies_list-notfound">Ничего не найдено</p>) : (
            <section className="movies-list">
              {props.searchedMovies.slice(0, renderMoviesCount).map((movie) => (
                <MoviesCard
                  movie={movie}
                  key={movie.owner ? movie._id : movie.id}
                  likeMovie={props.likeMovie}
                  isLoading={props.isLoading}
                  removeMovie={props.removeMovie}
                />
              ))}
            </section>
          )}
          {!props.isLoading && renderButtonMore && (
            <button
              className="movies-list__more-button"
              type="button"
              onClick={handleMoreClick}
            >
              Ещё
            </button>
          )}
        </>
      )}
    </>
  );
}

export default MoviesCardsList;
