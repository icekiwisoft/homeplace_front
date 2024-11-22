import Footer from '@components/Footer/footer';
import Header from '@components/Header/header';
import Newslater from '@components/Newslater/Newslater';
import Services from '@components/services/Services';
import Stats from '@components/Stats/Stats';
import React from 'react';

export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <Services />
      <Stats />
      <Newslater />
      <Footer />
    </>
  );
}
