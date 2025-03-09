import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import image from '../../assets/img/IMG-20210906-WA0027-1-1200x1200.jpg';
import image2 from '../../assets/img/photo_2023-10-18_19-37-38.jpg';
import imgbg from '@assets/bg_img/imgbg.png'
import img10 from '@assets/bg_img/img10.png'
import vector from '@assets/img/SVG/Vector.png'
// import AuthContext from '../../context/AuthContext';

function Services(): React.ReactElement {
  return (
    <>
      <section className='w-full'>
        <div className='px-4 sm:px-6 lg:px-8 2xl:mx-[190px]'>
          <div className='flex flex-col py-8 md:py-12'>
            {/* Services Header */}
            <div className="flex flex-col text-center px-4 sm:px-8 md:px-16 lg:px-72 mt-20 md:mt-40 mb-8">
              <h2 className='font-bold text-[#0D2E4F] text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight'>
                Our services
              </h2>
              <p className='font-light text-[#989898] mt-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3">
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <div className='w-full items-center flex flex-col py-5 px-6 sm:px-12 lg:px-24 bg-[#ffffff] border-[18px] border-[#ea7d006c] rounded-sm'>
                    <span className='inline-block w-16 h-16 md:w-20 md:h-20 bg-blue-gray-500 rounded-full'></span>
                    <h3 className='text-[#0D2E4F] font-bold text-lg mt-4 capitalize'>office</h3>
                    <p className='text-[#EA7D00] font-normal text-base capitalize text-nowrap '>123 properties</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perfect Property Section */}
      <section className='w-full my-16 md:my-28'>
        <div className='px-4 sm:px-6 lg:px-4 2xl:mx-[190px]'>
          <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12'>
            <div className='w-full lg:w-[35rem] flex flex-col gap-5'>
              <h2 className='font-bold text-[#0D2E4F] text-3xl/normal sm:text-4xl/normal capitalize'>
                #1 place to find the perfect property
              </h2>
              <p className='font-light text-base lg:text-lg text-[#989898]'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className='flex flex-col gap-4 font-light text-base lg:text-lg text-[#989898]'>
                {[1, 2, 3].map((item, index) => (
                  <li key={index} className='flex gap-3'>
                    <img className='object-none' src={vector} alt="" />
                    Lorem ipsum dolor sit amet.
                  </li>
                ))}
              </ul>
              <button className='rounded-sm bg-[#EA7D00] text-center px-6 py-3 w-fit font-normal text-white text-base hover:bg-[#d67100] transition-colors'>
                contact us
              </button>
            </div>
            <div className='w-full lg:w-[600px] h-[400px] lg:h-[600px] bg-[url(@assets/bg_img/imgbg.png)] bg-cover bg-center flex items-center justify-center'>
              <img className='w-[80%] h-[80%] lg:w-[500px] lg:h-[500px] object-cover' src={img10} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      
    </>
  );
}

export default Services;
