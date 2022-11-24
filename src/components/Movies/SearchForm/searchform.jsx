import React, {
} from 'react';
import CheckBox from './CheckBox/checkbox';

import './serchform.scss';

function Search({ ...props }) {
  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search"
          autoComplete="off"
          onSubmit={props.searchHandler}
          noValidate
        >
          <div className="search__wrapper">
            <i className="search__icon" />
            <input
              className={`search__input ${props.formValidation ? '' : 'search__input_invalid'}`}
              name="search"
              type="search"
              placeholder={props.formValidation ? 'Фильм' : 'Нужно ввести ключевое слово'}
              value={props.searchValue || ''}
              onChange={props.searchChangeValueHandler}
              required
            />
            <div className="search__toolbox">
              <button
                className="search__button"
                type="submit"
                aria-label="search-button"
                disabled={!props.formValidation}
              />
              <CheckBox />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Search;
