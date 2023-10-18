import React from 'react'
import image from '../../assets/img/IMG-20210906-WA0027-1-1200x1200.jpg';
import './css_services.css'

function Services() {
  return (
    <>
      <div className='relative w-full py-[100px] flex justify-center items-center'>
        <div className='flex flex-col max-w-5xl gap-[100px]'>
            <div className='flex flex-row gap-5'>
                <img className='h-auto w-1/2 rounded-[20px]' src={image}/>
                <div className='flex flex-col'>
                    <h1>Discover the house of your dreams</h1>
                    <h2>Install the plugin and convert your designs to a responsive site.</h2>
                    <div>View more</div>
                </div>
            </div>
            <div className='flex flex-row gap-5'>
                <div className='flex flex-col'>
                    <h1>Discover furnishings</h1>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est perferendis.</h2>
                    <div>View more</div>
                </div>
                <img className='h-auto w-1/2 rounded-[20px]' src={image}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Services
