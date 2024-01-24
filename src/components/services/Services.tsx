import React from 'react';
import image from '../../assets/img/IMG-20210906-WA0027-1-1200x1200.jpg';
import image2 from '../../assets/img/photo_2023-10-18_19-37-38.jpg'
import './services.scss'

function Services():React.ReactElement {
  return (
    <>
      <div className='relative w-full md:py-[100px] p-[50px] flex justify-center items-center lg:px-[75px] xl:px-[120px] '>
        <div className='flex flex-col   gap-y-20 md:gap-[100px]'>
            <div className='flex justify-between  md:flex-row md:gap-x-20 gap-5 flex-col'>
                <img className='h-auto md:w-[46%] w-full rounded-[20px] lg:m-w-[383px]' src={image2}/>
                <div className='flex flex-col gap-5 items-start '>
                    <h1 className='leading-none md:leading-tight w-3/4 '>Discover the house of your dreams</h1>
                    <span className='text-[1.3rem] text-gray-700'>Install the plugin and convert your designs to a responsive site.</span>
                    <button className='rounded-lg bg-gray-900  text-white p-4 w-48  '>View more</button>
                </div>
            </div>
            <div className='flex md:flex-row md:gap-x-20 gap-5 flex-col-reverse'>
                <div className='flex flex-col gap-5 items-start w-1/2 lg:pr-[15%]'>
                    <h1>Discover furnishings</h1>
                    <span className='text-[1.3rem] text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est perferendis.</span>
                    <button className='rounded-lg bg-gray-900  text-white p-4 w-48 '>View more</button>
                </div>
                <img className='h-auto md:w-[46%] w-full rounded-[20px] lg:m-w-[383px]' src={image}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Services
