import React, { createContext } from "react";
import Footer from "@components/Footer/footer";
import News_later from "@components/News_later/news_later";
import Services from "@components/services/Services";
import Header from "@components/Header/header";
import Stats from "@components/Stats/Stats";
import { Input } from "@material-tailwind/react";


export default function Home(): React.ReactElement {
  return (
    <>
      <Header />
      <Services />
      <Stats />
      <News_later />
      <Footer />
    </>
  )
}
