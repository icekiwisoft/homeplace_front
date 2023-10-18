import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import img1 from "../../../assets/bg_img/salon-viena-vision-confort-5-places.jpg"
import img2 from "../../../assets/bg_img/6327323_1_115110.jpg"

// Import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css';

export default function Hero() {
  return (
    <div>
        <Swiper className="relative -top-2 w-full h-[90vh] z-10"
         modules={[Navigation, Pagination, A11y]}
         spaceBetween={0}
         slidesPerView={1}
         navigation
         pagination={{ clickable: true }}
         scrollbar={{ draggable: false }}
         onSwiper={(swiper) => console.log(swiper)}
         onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <div id='slide1' className='relative w-full items-center flex justify-center'>
                    <img src={img1} className='w-full bottom-8'/>
                    <span className='absolute'>Slide 1</span>
                </div></SwiperSlide>
            <SwiperSlide>
                <div id='slide1' className='w-full h-full'>
                    <img src={img2} className='w-full h-full'/>
                    <span>Slide 2</span>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}
