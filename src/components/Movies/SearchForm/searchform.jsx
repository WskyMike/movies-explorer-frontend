import React from 'react';
import ShortFilms from './CheckBox/checkbox';

import './serchform.scss';

function Search() {
  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search"
          method="get"
          autoComplete="off"
        >
          <div className="search__wrapper">
            <i className="search__icon" />
            <input
              className="search__input"
              name="search"
              type="search"
              placeholder="Фильм"
              required
            />
            <div className="search__toolbox">
              <button
                className="search__button"
                type="submit"
                aria-label="search-button"
              />
              <ShortFilms />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Search;
