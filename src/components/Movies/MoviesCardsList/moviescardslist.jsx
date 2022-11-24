import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/moviescard';
import Preloader from '../../../vendor/Preloader/Preloader';
import './moviescardslist.scss';

function MoviesCardsList({ ...props }) {
  const { location } = useLocation();
  const windowInnerWidth = window.innerWidth;
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(0);
  const [showMoreMoviesCount, setShowMoreMoviesCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(windowInnerWidth);

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

  useEffect(() => {
    if (location === '/movies' || location === '/saved-movies') {
      if (windowWidth <= 481) {
        setRenderedMoviesCount(5);
        setShowMoreMoviesCount(2);
      } else if (windowWidth <= 769) {
        setRenderedMoviesCount(8);
        setShowMoreMoviesCount(2);
      } else if (windowWidth <= 1270) {
        setRenderedMoviesCount(12);
        setShowMoreMoviesCount(3);
      } else {
        setRenderedMoviesCount(12);
        setShowMoreMoviesCount(4);
      }
    } else {
      setRenderedMoviesCount(props.searchedMovies.length);
    }
  }, [windowWidth, location, props.searchedMovies.length]);

  function handleShowMoreMovies() {
    setRenderedMoviesCount(renderedMoviesCount + showMoreMoviesCount);
  }

  return (
    <>
      {props.isLoading && <Preloader />}
      {!props.isLoading && (
        <section className="movies-list">
          {props.searchedMovies.slice(0, renderedMoviesCount).map((movie) => (
            <MoviesCard
              movie={movie}
              searchedMovies={props.searchedMovies}
              key={movie.owner ? movie._id : movie.id}
              likeMovie={props.likeMovie}
              isLoading={props.isLoading}
              removeMovie={props.removeMovie}
            />
          ))}
        </section>
      )}
      {!props.isLoading && props.searchedMovies.length > renderedMoviesCount && (
        <button
          className="movies-list__more-button"
          type="button"
          onClick={handleShowMoreMovies}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default MoviesCardsList;
