import React, { useCallback, useState } from "react";
import Nav2 from "../../components/Nav2/Nav2";
import ProductCard from "../../components/ProductCard/ProductCard";
import useAxios from "../../utils/useAsios";
import { Ad } from "../../utils/types";

export default function Download(): React.ReactElement {
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const getAds = () => {
    setIsLoading(true);
  };
  return (
    <div className="2xl:px-20 xl:px-20  ">
      <Nav2 />
      <section className="grid 2xl:gap-5 2xl:px-0   gap-8 2xl:grid-cols-5 lg:grid-cols-3    grid-cols-1  sm:grid-cols-3 my-8 ">
        {ads.map((ad) => {
          return <ProductCard {...ad} key={ad.id} />;
        })}
      </section>
    </div>
  );
}
