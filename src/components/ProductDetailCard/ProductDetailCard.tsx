import React, { useEffect, useState } from "react";
import { Ad, Media } from "../../utils/types";
import { HiPhone, HiShare } from "react-icons/hi2";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import useAxios, { baseURL } from "../../utils/useAsios";
import dayjs from "dayjs";

export default function ProductDetailCard(props: Ad): React.ReactElement {
  const {
    price,
    description,
    announcer,
    medias: mediasCount,
    presentation,
    id,
    creation_date,
  } = props;
  const [medias, setMedias] = useState<Media[]>([]);
  const [swiperRef, setSwiperRef] = useState<Swiper>();

  const axios = useAxios();

  const getMedias = async () => {
    const response = await axios.get(`/ads/${id}/medias`);
    setMedias([...response.data]);
  };
  useEffect(() => {
    if (mediasCount) getMedias();
  }, []);
  return (
    <div className="bg-gray-200 py-4 px-5 rounded-lg">
      <h2 className="text-2xl font-semibold mb-5">{description}</h2>

      <div className="flex max-w-full gap-10">
        <div className="flex-[3] max-w-[512px] relative ">
          <Swiper
            className="  h-[400px] rounded-lg border-none "
            onSwiper={setSwiperRef}
          >
            {medias.map((m, i) => {
              return (
                <SwiperSlide key={m.id}>
                  <img
                    alt={m.id}
                    src={"http://localhost:8000" + m.file}
                    className="object-fill  min-h-full min-w-full"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            keyboard={{
              enabled: true,
            }}
            modules={[Keyboard, Mousewheel]}
            className="mt-5"
          >
            {medias.map((m, i) => {
              return (
                <SwiperSlide key={m.id} className="!w-16 ">
                  <button
                    title="show this media"
                    key={m.id}
                    onClick={() => swiperRef.slideTo(i)}
                    className="h-16 w-16 rounded-lg overflow-hidden"
                  >
                    <img
                      alt={m.id}
                      src={baseURL + m.thumbnail}
                      className="object-fill min-h-full min-w-full"
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex-[2] flex flex-col gap-8  ">
          <div className="bg-white rounded-lg flex-1 py-2 px-9">
            <h2 className="text-3xl font-bold">{price} frcfa</h2>
            <div className="flex font-light flex-col gap-2 mt-4">
              <span className="text-gray-900">
                publié le {dayjs(creation_date).format("DD/MM/YYYY")}
              </span>
              <span className="text-gray-900">publie par {announcer.name}</span>
            </div>
          </div>
          <div className="flex-1 w-full py-2 rounded-lg bg-white">
            <div className="flex   justify-between px-5">
              <button className="bg-gray-900  text-white px-3 py-3 flex items-center rounded-lg font-semibold gap-2">
                {" "}
                <HiPhone className="text-orange-900" size={20} /> afficher le
                contact
              </button>
              <button className="  px-3 py-3 flex items-center rounded-lg font-semibold gap-2">
                {" "}
                <HiShare /> partager
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
