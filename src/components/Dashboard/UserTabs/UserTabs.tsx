import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import defaultFurnitureImg from "../../../assets/default-img/furnitures.jpg";
import defaultHouseImg from "../../../assets/default-img/houses.jpg";
import { Link, useParams } from "react-router-dom";
import { Ad, Media } from "../../../utils/types";
import useAxios from "../../../utils/useAsios";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import AdsTab from "./AdsTab/AdsTab";

function AnnounceTab() {
  const { id } = useParams();
  const [ads, setAds] = useState<Ad[]>([]);
  const axios = useAxios();

  const getAds = async () => {
    const response = await axios.get(`/announcers/${id}/ads`);
    setAds([...ads, ...response.data]);
  };
  useEffect(() => {
    getAds();
  }, []);
  return (
    <div className="grid grid-cols-3 xxl:grid-cols-4 gap-5">
      {ads.map((ad) => {
        return <ProductCard {...ad} />;
      })}
    </div>
  );
}

function MediaTab() {
  const { id } = useParams();
  const [medias, setmedias] = useState<Media[]>([]);
  const axios = useAxios();

  const getmedias = async () => {
    const response = await axios.get(`/announcers/${id}/medias`);
    setmedias([...medias, ...response.data]);
  };
  useEffect(() => {
    getmedias();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-5">
      {medias.map((media) => {
        return <MediaCard {...media} />;
      })}
    </div>
  );
}

export default function UserTabs() {
  const [option, setOption] = useState(0);

  return (
    <Tabs id="custom-animation" value={0}>
      <TabsHeader>
        <Tab value={0}>ads</Tab>
        <Tab value={1}>media</Tab>
      </TabsHeader>
      <TabsBody
        animate={{
          initial: { y: 1000 },
          mount: { y: 0 },
          unmount: { x: 250 },
        }}
      >
        <TabPanel value={0}>
          <AdsTab />
        </TabPanel>
        <TabPanel value={1}>
          <AdsTab />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
