import React, { useCallback, useContext, useEffect, useState } from "react";

import { Ad } from "../../utils/types";
import useAxios from "../../utils/useAsios";
import Nav2 from "@components/Nav2/Nav2";
import ProductCard from "@components/ProductCard/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from "react-icons/hi2";

export default function Furnitures(): React.ReactElement {
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();
  const [nextPage, setNextPage] = useState<string | null>("ads");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // State for filter sidebar
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [UrlSearchParam, setUrlSearchParam] = useSearchParams();

  const handleFilterButtonClick = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen); // Toggle filter sidebar visibility
  };

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



      <section
        className={
          " " +
          " bg-gray-200  py-4 min-h-screen flex   2xl:px-10 xl:px-6  gap-y-14   "
        }
      >
     
     <div className="text-center m-auto w-96 bg-orange-600/15 text-orange-800 rounded-xl py-4 px-4">
      <span>vous decouvrirez bientot une large gamme de mobilier </span>
     </div>
      </section>
    </>
  );
}
