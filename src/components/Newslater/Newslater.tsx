import React from 'react';
import img10 from '@assets/bg_img/img10.png';


export default function Newslater() {
  return (
    <>
      <section className='w-full'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]'>
          <div className='flex flex-col lg:flex-row items-center gap-8 lg:gap-12 py-16 md:py-24'>
            {/* Image Container */}
            <div className='w-full lg:w-1/2'>
              <div className='relative'>
                <div className='absolute inset-0 bg-[#EA7D00] rounded-sm transform translate-x-2 translate-y-2'></div>
                <img 
                  src={img10} 
                  alt="Modern house" 
                  className='w-full h-full object-cover rounded-sm relative z-10'
                />
              </div>
            </div>

            {/* Content Container */}
            <div className='w-full lg:w-1/2 flex flex-col gap-6'>
              <h1 className='font-bold text-[#0D2E4F] text-3xl/snug sm:text-4xl/snug lg:text-5xl/snug'>
                Welcome To Domilix The #1 Estate Companey
              </h1>
              <p className='font-light text-[#989898] text-base sm:text-lg'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <button className='rounded-sm bg-[#EA7D00] text-center px-6 py-2.5 md:py-3 w-fit font-normal text-white text-base sm:text-lg hover:bg-[#d67100] transition-colors'>
                  Read More
                </button>
                <button className='rounded-sm bg-[#0D2E4F] text-center px-6 py-2.5 md:py-3 w-fit font-normal text-white text-base sm:text-lg hover:bg-[#0a2340] transition-colors'>
                  Get An Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
