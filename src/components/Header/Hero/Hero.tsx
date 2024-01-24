import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import img1 from "../../../assets/bg_img/salon-viena-vision-confort-5-places.jpg"
import img2 from "../../../assets/bg_img/6327323_1_115110.jpg"
import "./hero.scss"
// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';
import React from 'react';
import { StringMappingType } from 'typescript';
import { Url } from 'url';

interface CarouselItemInterface {
    title: string
    text?: string
    button?: string
    image?: string
}

const CarouselItems: CarouselItemInterface[] = [
    {
        image: img1,
        title: "more than thousand house",
        text: ' lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }
    ,
    {
        image: img2,
        title: "more than thousand house",
        text: ' lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }

    ,
    {
        image: img2,
        title: "more than thousand house",
        text: ' lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }

    ,
    {
        image: img2,
        title: "more than thousand house",
        text: ' lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }


    ,
    {
        image: img2,
        title: "more than thousand house",
        text: ' lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
    }
]





export default function Hero(): React.ReactElement {
    const swiper = useSwiper();

    return (

        <Swiper autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}

            className='sm:h-[550px]  h-[600px]    '
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: false }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >

            {

                CarouselItems.map((item) => {
                    return (
                        <SwiperSlide className='  ' >
                            <div className='relative w-full h-full items-center flex justify-center'>
                                <img alt='' src={item.image} className=' min-w-full min-h-full ' />
                                <div className=' absolute top-0 text-left sm:w-[90%] lg:w-[70%] w-full flex items-center justify-center h-full' >
                                    <div className=' pl-[25px] sm:pl-[10px]  md:pl-[75px] '>
                                        <h2 className='text-slidetitle sm:text-[4rem]  text-white my-5 '>{item.title}</h2>
                                        <p className='text-slideparagraph my-7 sm:my-10 text-white'>
                                            {item.text}
                                        </p>
                                        <button className='transition cursor-pointer bg-[#fff] text-black font-bold px-5 py-2 my-2  rounded'>
                                            Obtain your house
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })

            }



        </Swiper>

    )
}
