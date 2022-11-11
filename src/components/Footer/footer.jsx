import React from 'react';
import { useLocation } from 'react-router-dom';

import './footer.scss';

function Footer() {
  const { pathname } = useLocation();
  if (pathname === '/profile' || pathname === '/signin' || pathname === '/signup' || pathname === '/404') return null;

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2022</p>
          <ul className="footer__list">
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru/"
                target="blank"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://github.com/WskyMike/movies-explorer-frontend"
                target="blank"
              >
                GitHub
              </a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://vk.com/mike.wsky" target="blank">
                ВКонтакте
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
