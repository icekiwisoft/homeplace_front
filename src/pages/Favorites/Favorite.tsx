import Nav2 from '@components/Nav2/Nav2';
import ProductCard from '@components/ProductCard/ProductCard';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Ad } from '../../utils/types';
import useAxios from '../../utils/useAsios';

export default function Favorite() {
  const [ads, setAds] = useState<Ad[]>([]);

  return (
    <>
      <Nav2 />
      <div className='bg-white fixed top-16 flex px-2  xl:px-10 lg:px-10 md:px-4 py-3 w-full '>
        <div className=' font-bold text-2xl '>Favoris</div>
      </div>
      <section
        className={
          ' ' +
          'grid 2xl:gap-5 bg-gray-200 mt-36 py-4 min-h-screen 2xl:px-10 xl:px-6 gap-y-4 gap-x-4 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 px-2 md:px-4 '
        }
      >
        {ads.map(ad => (
          <ProductCard {...ad} />
        ))}
      </section>
    </>
  );
}
