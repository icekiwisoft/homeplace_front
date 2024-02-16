import React from 'react';
import image from '../../assets/img/IMG-20210906-WA0027-1-1200x1200.jpg';
import image2 from '../../assets/img/photo_2023-10-18_19-37-38.jpg'
import './services.scss'
import { Link } from 'react-router-dom';

function Services():React.ReactElement {
  return (
    <>
      <div className='relative w-full md:py-[100px] p-[50px] flex justify-center items-center lg:px-[75px] xl:px-[120px] '>
        <div className='flex flex-col   gap-y-20 md:gap-[100px]'>
            <div className='flex justify-between  md:flex-row md:gap-x-20 gap-5 flex-col'>
              <div className='w-[483px] overflow-hidden rounded-[20px]'>
              <img className=' min-w-full  min-h-full  ' src={image2}/>
              </div>
        
                <div className='flex flex-col gap-5 items-start w-96 '>
                    <h1  className='text-[2rem]  leading-none md:leading-tight font-bold'>Discover the house of your dreams</h1>
                    <p className='text-[1.3rem] flex-1 text-gray-700'>We believe your dream home is more than square footage and price tags. It's a haven that reflects your spirit</p>
                  <Link to='announces'>  <button className='rounded-lg bg-gray-900  text-white py-3 w-48  '>View more</button></Link>
                </div>
            </div>
            <div className='flex md:flex-row md:gap-x-20 gap-5  justify-between flex-col-reverse'>
                <div className='flex flex-col gap-5 items-start  w-96'>
                    <h1 className='text-[2rem] font-bold'>Discover furnishings</h1>
                    <p className='text-[1.3rem] flex-1 text-gray-700'> Find the perfect pieces to transform your space and match your unique personality</p>
                    <Link to='announces'><button className='rounded-lg bg-gray-900  text-white p-3 w-48 '>View more</button></Link>
                </div>


                <div className='w-[483px] overflow-hidden rounded-[20px]'>
              <img className=' min-w-full  min-h-full object-fill ' src={image}/>
              </div>
         
            </div>
        </div>
      </div>
    </>
  )
}

export default Services
