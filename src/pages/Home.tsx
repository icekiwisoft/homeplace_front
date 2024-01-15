import React from "react";
import Footer from "../components/Footer/footer";
import News_later from "../components/News_later/news_later";
import Services from "../components/services/Services";
import Header from "../components/Header/header";

export default function Home():React.ReactElement {
  return (
    <>
      <Header />
      <Services/>
      <News_later />
      <Footer />
    </>
  )
}
