import React from 'react';

import './aboutproject.scss';

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <h2 className="title">О проекте</h2>
        <ul className="about-project__notes">
          <li className="about-project__note">
            <p className="about-project__note-title">
              Дипломный проект включал 5 этапов
            </p>
            <p className="about-project__note-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__note">
            <p className="about-project__note-title">
              На выполнение диплома ушло 5 недель
            </p>
            <p className="about-project__note-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-project__deadline">
          <li className="about-project__deadline-item">1 неделя</li>
          <li className="about-project__deadline-item">4 недели</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
