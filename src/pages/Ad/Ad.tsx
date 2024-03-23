import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductDetailCard from "../../components/ProductDetailCard/ProductDetailCard";

import React, { useCallback, useContext, useEffect, useState } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Ad as AdType } from "../../utils/types";
import useAxios from "../../utils/useAsios";
import AuthContext from "../../context/AuthContext";

export default function Ad(): React.ReactElement {
  const { id } = useParams();
  const [adInfo, setAdInfo] = useState<AdType | null>(null);

  const [ads, setAds] = useState<AdType[]>([]);
  const axios = useAxios();
  const [nextPage, setNextPage] = useState<string | null>("ads");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { filterBy } = useContext(AuthContext);

  const getAds = useCallback(() => {
    setIsLoadingMore(true);
    axios
      .get(nextPage!, {
        params: {
          orderBy: filterBy?.orderBy,
          announcer: adInfo!.announcer.id,
        },
      })
      .then((response) => {
        setAds([...ads, ...response.data.data]);
        setNextPage(response.data.links.next);
        setIsLoadingMore(false);
      });
  }, [isLoadingMore, ads, adInfo]);

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

    if (!ads.length && adInfo) getAds();

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [nextPage, isLoadingMore, getAds, ads, adInfo]);

  const getAdinfo = async () => {
    const response = await axios.get(`/ads/${id}`);
    setAdInfo(response.data);
  };

  useEffect(() => {
    setNextPage("ads");
    setAds([]);
    getAdinfo();
  }, [id]);

  return (
    <div className="2xl:px-20 xl:px-16 ">
      <Nav2 />
      <div className=" 2xl:px-0  px-10   my-8 ">
        {adInfo && <ProductDetailCard {...adInfo} />}
        <section>
          <h2 className="text-xl font-semibold  my-5">vos pourriez aimez</h2>
          <div className="grid 2xl:gap-5 2xl:px-0   gap-8 2xl:grid-cols-5 lg:grid-cols-3    grid-cols-1  sm:grid-cols-3 my-8 ">
            {ads.map((ad) => {
              return (
                <Link to={"/announces/" + ad.id}>
                  <ProductCard {...ad} key={ad.id} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
