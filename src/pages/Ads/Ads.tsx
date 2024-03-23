import React, { useCallback, useContext, useEffect, useState } from "react";

import { Ad } from "../../utils/types";
import useAxios from "../../utils/useAsios";
import FilterHeader from "../../components/FilterHeader/FilterHeader";
import Nav2 from "../../components/Nav2/Nav2";
import ProductCard from "../../components/ProductCard/ProductCard";
import {  Link, useSearchParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Ads(): React.ReactElement {
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();
  const [nextPage, setNextPage] = useState<string | null>("ads");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { filterBy } = useContext(AuthContext);
  const [UrlSearchParam, setUrlSearchParam] = useSearchParams();

  const getAds = useCallback(() => {
    setIsLoadingMore(true);
    axios
      .get(nextPage!, {
        params: {
          search: UrlSearchParam.get("search"),
          orderBy: filterBy?.orderBy,
          type: filterBy?.type == 2 ? undefined : filterBy?.type,
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
  }, [UrlSearchParam, filterBy]);

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
    <div className="2xl:px-20 xl:px-20  ">
      <Nav2 />
      <FilterHeader />
      <section className="grid 2xl:gap-5 2xl:px-0   gap-8 2xl:grid-cols-5 lg:grid-cols-3    grid-cols-1  sm:grid-cols-3 my-8 ">
        {ads.map((ad) => {
          return (
            <Link to={"/announces/"+ad.id}>
               <ProductCard {...ad} key={ad.id} />
            </Link>
         );
        })}
      </section>
    </div>
  );
}
