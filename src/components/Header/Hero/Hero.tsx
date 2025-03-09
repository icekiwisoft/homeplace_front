import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import img2 from '../../../assets/bg_img/6327323_1_115110.jpg';
import img1 from '../../../assets/bg_img/salon-viena-vision-confort-5-places.jpg';
import img10 from '../../../assets/bg_img/img10.png';

import 'swiper/css/bundle';
import 'swiper/css';
import React from 'react';
import { Link } from 'react-router-dom';


export default function Hero(): React.ReactElement {
  return (
    <>
      <div className='w-full h-[650px] md:h-screen lg:h-[650px]'>

        <div className='w-full h-full bg-[url(@assets/bg_img/img10.png)] bg-cover bg-center'>

          <div className='h-full flex items-center relative px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-[190px]'>

            <div className='flex flex-col justify-start w-full md:w-[35rem] lg:w-[40rem] gap-4 md:gap-6'>
              <h1 className='font-extrabold text-white text-3xl/snug sm:text-4xl/snug md:text-5xl/snug lg:text-6xl/snug'>
                Modern Houses Appartments and furnitures
              </h1>
              <p className='font-light text-white text-base sm:text-lg max-w-[90%] md:max-w-none'>
                Lorem ipsum dolore site amet consentus lorem is a text generation website for text completions
              </p>
              <button className='rounded-sm bg-[#EA7D00] text-center px-6 capitalize py-2.5 md:py-3 w-fit font-normal text-white text-base sm:text-lg hover:bg-[#d67100] transition-colors'>
                contact us
              </button>
            </div>

            <div className='flex justify-center items-center w-full absolute bottom-0 left-0 px-4 sm:px-6 md:px-8 lg:px-12 2xl:px-[190px] transform translate-y-1/2'>
              <div className='bg-[#EA7D00] w-full px-4 sm:px-8 lg:px-14 py-6 lg:py-8 drop-shadow-lg rounded-sm'>
                <form className='flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 md:gap-3'>
                  <input 
                    className='text-[#989898] border border-[#989898] font-light text-base lg:text-lg outline-[#EA7D00] px-2 py-2 rounded-sm w-full'
                    type="text" 
                    placeholder='Location'
                  />
                  <label htmlFor='property-type' className='sr-only'>Property type</label>
                  <select 
                    id='property-type' 
                    className='text-[#989898] border border-[#989898] font-light text-base lg:text-lg outline-[#EA7D00] px-2 py-2 pr-10 rounded-sm w-full'
                  >
                    <option value=''>Property type</option>
                    <option value='Imeuble'>Imeuble</option>
                    <option value='Villa'>Villa</option>
                    <option value='Palais'>Palais</option>
                  </select>
                  <button 
                    className='text-white bg-[#0D2E4F] px-6 lg:px-9 py-2.5 lg:py-3 rounded-sm w-full md:w-auto hover:bg-[#0a2340] transition-colors'
                    type='submit'
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
