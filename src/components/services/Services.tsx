import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import image from '../../assets/img/IMG-20210906-WA0027-1-1200x1200.jpg';
import image2 from '../../assets/img/photo_2023-10-18_19-37-38.jpg';
import AuthContext from '../../context/AuthContext';

function Services(): React.ReactElement {
  const navigate = useNavigate();
  return (
    <>
      <div className='relative max-w-full md:py-[100px] p-[20px] flex justify-center items-center lg:px-[75px] xl:px-[120px] '>
        <div className='flex flex-col w-full  gap-y-20 md:gap-[100px]'>
          <div className='flex justify-between  md:flex-row md:gap-x-20 gap-5 flex-col'>
            <div className='md:w-[483px] md:aspect-auto  aspect-video md:h-auto  w-full  overflow-hidden rounded-[20px]'>
              <img
                alt='house'
                className=' min-w-full  min-h-full object-cover  '
                src={image2}
              />
            </div>

            <div className='flex flex-col max-w-96 gap-5 items-start '>
              <h1 className='text-2xl font-semibold md:text-5xl  leading-none  md:font-bold'>
                Discover the house of your dreams
              </h1>
              <p className='text-[1.3rem] md:inline hidden flex-1 text-gray-700'>
                We believe your dream home is more than square footage and price
                tags. It's a haven that reflects your spirit
              </p>
              <Link
                className='rounded-lg bg-gray-900  text-center text-white py-3 w-48  '
                to={'/houses'}
              >
                View more
              </Link>
            </div>
          </div>
          <div className='flex md:flex-row md:gap-x-20 gap-5  justify-between flex-col-reverse'>
            <div className='flex max-w-96 flex-col gap-5 items-start  '>
              <h1 className='text-2xl font-semibold md:text-5xl md:font-bold'>
                Discover furnishings
              </h1>
              <p className='text-[1.3rem] md:inline hidden  flex-1 text-gray-700'>
                {' '}
                Find the perfect pieces to transform your space and match your
                unique personality
              </p>
              <Link
                className='rounded-lg bg-gray-900 text-center  text-white p-3 w-48 '
                to={'/furnitures'}
              >
                View more
              </Link>
            </div>

            <div className='md:w-[483px] md:aspect-auto   aspect-video md:h-auto  w-full  overflow-hidden rounded-[20px]'>
              <img
                alt='furniture'
                className=' min-w-full  min-h-full object-cover '
                src={image}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
