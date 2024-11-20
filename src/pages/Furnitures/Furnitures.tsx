import Nav2 from '@components/Nav2/Nav2';
import Timer from '@components/Timer/Timer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Ad } from '../../utils/types';
import useAxios from '../../utils/useAsios';
// import ProductCard from "@components/ProductCard/ProductCard";
// import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from "react-icons/hi2";

export default function Furnitures(): React.ReactElement {
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();
  const [nextPage, setNextPage] = useState<string | null>('ads');
  // const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // State for filter sidebar
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [UrlSearchParam, setUrlSearchParam] = useSearchParams();
  const targetDate = new Date('2024-11-30T23:59:59');

  // const handleFilterButtonClick = () => {
  //   setIsFilterSidebarOpen(!isFilterSidebarOpen); // Toggle filter sidebar visibility
  // };

  const getAds = useCallback(() => {
    setIsLoadingMore(true);
    axios
      .get(nextPage!, {
        params: {
          search: UrlSearchParam.get('search'),
        },
      })
      .then(response => {
        setAds([...ads, ...response.data.data]);
        setNextPage(response.data.links.next);
        setIsLoadingMore(false);
      });
  }, [isLoadingMore, ads]);

  useEffect(() => {
    setNextPage('ads');
    setAds([]);
  }, [UrlSearchParam]);

  useEffect(() => {
    let canLoadMore = true;

    function handleScrollEvent() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoadingMore &&
        nextPage &&
        ads.length &&
        canLoadMore
      ) {
        canLoadMore = false;
        getAds();
      }
    }

    if (!ads.length) getAds();

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [nextPage, isLoadingMore, getAds, ads]);

  return (
    <>
      <Nav2 />
      <section
        className={
          ' ' +
          ' bg-gray-200 py-4 min-h-screen flex flex-col items-center justify-center 2xl:px-10 xl:px-6 gap-y-14'
        }
      >
        <div className='flex flex-col gap-6 justify-center'>
          <h1 className='lg:text-5xl sm:text-4xl text-3xl text-black text-center font-semibold'>
            Bientôt disponible !
          </h1>
          <p className='text-gray-800 lg:text-sm text-xs text-center px-[15%]'>
            Nous travaillons d'arrache-pied pour vous proposer un nouveau
            service super cool. Reste connecté(e) pour en savoir plus.
          </p>
          {/* <section
        className={" " + " bg-gray-200  py-4 min-h-screen flex   2xl:px-10 xl:px-6  gap-y-14   "}>
        <div className="text-center m-auto w-96 bg-orange-600/15 text-orange-800 rounded-xl py-4 px-4">
          <span>vous decouvrirez bientot une large gamme de mobilier </span> */}
        </div>
        <Timer targetDate={targetDate} />
      </section>
    </>
  );
}
