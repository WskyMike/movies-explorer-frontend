import React from 'react';
import Icon from '../../../images/main_portfolio_link-pic.svg';
import './portfolio.scss';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://wskymike.github.io/how-to-learn/" target="blank">
              Статичный сайт
              <img src={Icon} className="portfolio__link-pic" alt="картинка-ссылка" />
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://wskymike.github.io/russian-travel/" target="blank">
              Адаптивный сайт
              <img src={Icon} className="portfolio__link-pic" alt="картинка-ссылка" />
            </a>
          </li>
          <li className="portfolio__item">
            <a className="portfolio__link" href="https://mesto.webtm.ru" target="blank">
              Одностраничное приложение
              <img src={Icon} className="portfolio__link-pic" alt="картинка-ссылка" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
