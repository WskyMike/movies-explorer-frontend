import React from 'react';
import myPhoto from '../../../images/myphoto.jpeg';
import './aboutme.scss';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="title">Студент</h2>
        <article className="about-me__card">
          <div className="about-me__data">
            <div className="about-me__text">
              <p className="about-me__title">Михаил</p>
              <p className="about-me__subtitle">
                Фронтенд-разработчик, 32 года
              </p>
              <p className="about-me__description">
                Прежде всего, внедрение современных методик, а также свежий
                взгляд на привычные вещи — безусловно открывает новые горизонты
                для новых принципов формирования материально-технической и
                кадровой базы. А также явные признаки победы институционализации
                описаны максимально подробно. Значимость этих проблем настолько
                очевидна, что экономическая повестка сегодняшнего дня напрямую
                зависит от поэтапного и последовательного развития общества.
              </p>
            </div>
            <address className="about-me__contacts">
              <a
                className="about-me__link"
                href="https://vk.com/mike.wsky"
                target="blank"
              >
                VK
              </a>
              <a
                className="about-me__link"
                href="https://instagram.com/mikhail.ivanovich"
                target="blank"
              >
                Instagram
              </a>
              <a
                className="about-me__link"
                href="https://github.com/WskyMike"
                target="blank"
              >
                GitHub
              </a>
            </address>
          </div>
          <picture>
            <img
              className="about-me__photo"
              src={myPhoto}
              alt="фото студента"
            />
          </picture>
        </article>
      </div>
    </section>
  );
}

export default AboutMe;
