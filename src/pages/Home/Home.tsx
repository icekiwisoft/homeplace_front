import Footer from '@components/Footer/footer';
import Header from '@components/Header/header';
import News_later from '@components/News_later/news_later';
import Services from '@components/services/Services';
import Stats from '@components/Stats/Stats';
import { Input } from '@material-tailwind/react';
import React, { createContext } from 'react';

export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <Services />
      <Stats />
      <News_later />
      <Footer />
    </>
  );
}
