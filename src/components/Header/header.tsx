import React from 'react';

import Hero from './Hero/Hero';
import Nav from './Nav/Nav';

export default function Header(): React.ReactElement {
  return (
    <header>
      <Nav />
      <div>
        <Hero />
      </div>
    </header>
  );
}
