import React from 'react';

import './hero.scss';
import { Link } from 'react-router-dom';
import LandingLogo from '../../../images/landing-logo.svg';

function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__text-block">
          <h1 className="hero__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <h2 className="hero__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
          <button type="button" to="#" className="hero__button default-link">
            <Link className="hero__link" href="http://ya.ru">
              Узнать больше
            </Link>
          </button>
        </div>
        <div className="hero__img-block">
          <img
            className="hero__img"
            src={LandingLogo}
            alt="Лого в форме планеты земля"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
