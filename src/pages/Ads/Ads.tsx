import React, { useCallback, useContext, useEffect, useState } from "react";

import { Ad } from "../../utils/types";
import useAxios from "../../utils/useAsios";
import Nav2 from "@components/Nav2/Nav2";
import ProductCard from "@components/ProductCard/ProductCard";
import { Link, useSearchParams } from "react-router-dom";
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from "react-icons/hi2";

export default function Ads(): React.ReactElement {
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
      {isFilterSidebarOpen && (
        <div className="fixed z-30 border-r border-r-gray-300 shadow-lg left-0 w-80 bg-white h-[calc(100%-64px)] top-16 text-xs py-3 px-4 ">
          {/* Budget Section */}
          <div className="mb-4">
            <h2 className="font-bold mb-2 text-base">Budget :</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="min"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="max"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-4">
            <h2 className="font-bold mb-2 text-base">Categories :</h2>
            <div>
              {[
                "Chambre",
                "Studio",
                "Appartement",
                "Maison",
                "Villa",
                "Bureau",
              ].map((category) => (
                <label key={category} className="block mb-1">
                  <input type="checkbox" className="mr-2" />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Standing Section */}

          <div className="mb-4">
            <h2 className="font-bold mb-2 text-base">Standing :</h2>
            <div>
              {["Standard", "Confort", "Haut Standing"].map((standing) => (
                <label key={standing} className="block mb-1">
                  <input type="radio" name="standing" className="mr-2" />
                  {standing}
                </label>
              ))}
            </div>
          </div>

          {/* Number of Rooms Section */}
          <div className="mb-4">
            <h2 className="font-bold mb-2 text-base">Nombre de Chambres :</h2>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="min"
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                placeholder="max"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white fixed top-16 w-screen justify-center flex items-center md:justify-between lg:justify-between px-2  xl:px-10 lg:px-10 md:px-4 py-3">
        <div className="flex">
          <span className="hidden lg:block">Toutes les</span>&nbsp;
          <span className="capitalize lg:normal-case md:normal hidden xl:block lg:block md:block ">categories</span>
        </div>
        &nbsp;
        <div className="flex w-96  rounded-full px-3 py-1.5 bg-gray-200 border-solid items-center  ">
          <HiMagnifyingGlass size={28} className="text-gray-800" />
          <input
            type="text"
            placeholder="search ...."
            defaultValue={UrlSearchParam.get("search")!}
            className="  outline-none flex-1 bg-transparent px-2  text-[1rem]  text-gray-600  font-normal"
          />
        </div> &nbsp;

        <button
          className={
            (isFilterSidebarOpen && "bg-gray-200 ") +
            " inline-flex py-2 px-4 lg:px-0 md:px-0 rounded-lg  items-center gap-2 text-gray-800"
          }
          onClick={handleFilterButtonClick}
        >
          {" "}
          <HiAdjustmentsHorizontal size={24} />
          <span className=" hidden lg:block md:block  " >filtre avancé</span>
        </button>
      </div>

      <section
        className={
          " " +
          (isFilterSidebarOpen
            ? "ml-80 w-[calc(100%-320px)] lg:!grid-cols-3 "
            : "") +
          "grid 2xl:gap-5 bg-gray-200 mt-32 py-4 min-h-screen   2xl:px-10 xl:px-6  gap-y-14   gap-x-10 2xl:grid-cols-5 lg:grid-cols-4    grid-cols-1  sm:grid-cols-3  "
        }>
        {ads.map((ad) => {
          return (
            <ProductCard {...ad} />
          );
        })}
      </section>
    </>
  );
}
