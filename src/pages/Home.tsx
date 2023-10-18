import React from "react";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import News_later from "../components/News_later/news_later";

export default function Home():React.ReactElement {
  return (
    <>
      <Header />
      <News_later />
      <Footer />
    </>
  )
}
