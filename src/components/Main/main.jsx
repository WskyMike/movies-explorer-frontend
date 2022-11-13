import React from 'react';

import Hero from './Hero/hero';
import AboutMe from './AboutMe/aboutme';
import AboutProject from './AboutProject/aboutproject';
import Portfolio from './Portfolio/portfolio';
import Techs from './Techs/techs';

import './main.scss';

function Main() {
  return (
    <main className="main">
      <Hero />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
