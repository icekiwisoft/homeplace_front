import Nav2 from '@components/Nav2/Nav2'
import ProductCard from '@components/ProductCard/ProductCard'
import { Ad } from "../../utils/types";
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import useAxios from '../../utils/useAsios';
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2';

export default function Favorite() {
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [nextPage, setNextPage] = useState<string | null>("ads");
  const [UrlSearchParam, setUrlSearchParam] = useSearchParams();

  const getAds = useCallback(() => {
    setIsLoadingMore(true);
    axios
      .get(nextPage!, {
        params: {
          search: UrlSearchParam.get("search"),
        },
      })
      .then((response) => {
        setAds([...ads, ...response.data.data]);
        setNextPage(response.data.links.next);
        setIsLoadingMore(false);
      });
  }, [isLoadingMore, ads]);

  useEffect(() => {
    setNextPage("ads");
    setAds([]);
  }, [UrlSearchParam]);

  useEffect(() => {
    var canLoadMore = true;

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

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [nextPage, isLoadingMore, getAds, ads]);

  return (
    <>
      <Nav2 />
      <div className="bg-white fixed top-16 w-full flex items-center justify-between px-10  py-3">
        <div>Mes Favoris <span>5</span> </div>


        <button
          className={" inline-flex py-2 px-4 rounded-lg  items-center gap-2 text-gray-800"} >
          {" "}
          Tirer Par
          <select className=' bg-[#D9D9D9] p-3 rounded-md outline-none '>
            <option value="lol">Par defaut</option>
            <option value="">Date d'ajout</option>
          </select>
        </button>
      </div>
      <section
        className={
          " " +
          "grid 2xl:gap-5 bg-gray-200 mt-32 py-4 min-h-screen   2xl:px-10 xl:px-6  gap-y-14   gap-x-10 2xl:grid-cols-4 lg:grid-cols-4    grid-cols-1  sm:grid-cols-3  "
        }>
        {ads.map((ad) => {
          return (
            <ProductCard {...ad} />
          );
        })}
      </section>
    </>
  )
}
