import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import img1 from "../../../assets/bg_img/salon-viena-vision-confort-5-places.jpg";
import img2 from "../../../assets/bg_img/6327323_1_115110.jpg";

import "./hero.scss"
// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css";
import React from "react";

import { Link } from "react-router-dom";

interface CarouselItemInterface {
  title: string;
  text?: string;
  button?: string;
  image?: string;
  id: number;
}

const CarouselItems: CarouselItemInterface[] = [
  {
    image: img1,
    title: "more than thousand house",
    text: " No need to wade through endless listings. Here, you'll discover a vast ocean of potential homes, each with its own unique story waiting to unfold",
    button: "Obtain your house",
    id: 0,
  },
  {
    image: img2,
    title: "find your furnitures",
    text: " No more furniture fatigue. Dive into a world where thousands of options await, ready to transform your space and reflect your individuality",
    button: "decour your home",
    id: 1,
  },
];

export default function Hero(): React.ReactElement {
  const swiper = useSwiper();

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="sm:h-[550px] *:!border-none   h-[600px]    "
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: false }}
    >
      {CarouselItems.map((item) => {
        return (
          <SwiperSlide className="  " key={item.id}>
            <div className="relative w-full h-full items-center flex justify-center">
              <img
                alt=""
                src={item.image}
                className=" min-w-full border-0 min-h-full object-cover brightness-50 "
              />
              <div className=" absolute top-0 text-left sm:w-[90%] lg:w-[70%] w-full flex items-center justify-center h-full">
                <div className=" pl-[25px] sm:pl-[10px]  md:pl-[75px] ">
                  <h2 className="text-slidetitle text-[3.2rem] md:text-[4rem]  text-white my-5 ">
                    {item.title}
                  </h2>
                  <p className="text-slideparagraph my-7 sm:my-10  text-gray-200">
                    {item.text}
                  </p>
                  <Link to="/login">
                    <button className="transition cursor-pointer bg-[#fff] text-black font-bold px-5 py-2 my-2  rounded">
                      {item.button}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
