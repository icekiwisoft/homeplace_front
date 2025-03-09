import React from 'react'
import img10 from '@assets/bg_img/img10.png';


function Stats() {
  return (
    <>
      <section className='w-full'>
        <div className='px-4 sm:px-6 lg:px-8 2xl:mx-[190px]'>
          <div className='py-8 md:py-12 flex flex-col'>
            <div className="flex flex-col text-center px-4 sm:px-8 md:px-16 lg:px-72 mb-12 md:mb-24">
              <h2 className='font-bold text-[#0D2E4F] text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight'>
                Some Properties
              </h2>
              <p className='font-light text-[#989898] mt-4'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {[...Array(6)].map((_, index) => (
                <div key={index} className='mx-auto'>
                  <div className='w-full max-w-[350px] bg-[#ffffff] shadow-lg rounded-sm overflow-hidden'>
                    <div className='w-full h-[200px]'>
                      <img className='w-full h-full object-cover' src={img10} alt="" />
                    </div>
                    <div className='px-4 flex items-start gap-4 font-light text-[#989898] text-sm border-b border-[#989898] py-2 mb-2 flex-wrap'>
                      <p>5 Rooms</p>
                      <p>2 Baths</p>
                      <p>5 Rooms</p>
                      <p>1100 M SqT</p>
                    </div>
                    <div className='px-4 flex flex-col gap-2 border-b border-[#989898] pb-2'>
                      <h3 className='font-semibold text-2xl sm:text-3xl text-[#000000]'>Room Title</h3>
                      <p className='font-light text-base text-[#989898]'>
                        Lorem ipsum dolor sit amet, consectetur sed adipiscing elit, why do eiusmod tempor incididunt.
                      </p>
                    </div>
                    <div className='px-4 flex justify-between items-center w-full py-3'>
                      <span className='font-semibold text-[#000000]'>350,000FCFA</span>
                      <button className='text-white capitalize bg-orange-700 hover:bg-orange-800 transition-colors py-2 px-4 rounded-sm'>
                        view details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Stats
