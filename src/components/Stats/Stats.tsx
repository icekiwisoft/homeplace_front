import React, { useEffect, useState } from "react";
import { MdChair, MdGroup, MdHouse } from "react-icons/md";
import useAxios from "../../utils/useAsios";
import { HomeIcon, HomeModernIcon, UserGroupIcon, WindowIcon } from "@heroicons/react/24/solid";

export default function Stats(): React.ReactElement {
  const [stats, setStats] = useState<any[]>([]);
  const axios = useAxios();

  const getStat = async () => {
    const response = await axios.get("/");
    setStats([
      {
        name: "houses",
        value: response.data.houses,
        icon: HomeIcon,
      },
      {
        name: "furnitures",
        value: response.data.furnitures,
        icon: WindowIcon,
        
      },
      {
        name: "announcer",
        value: response.data.announcers,
        icon: UserGroupIcon,
      },
    ]);
  };

  useEffect(() => {
    getStat();
  }, []);
  return stats.length ? (
    <div className="px-10  grid grid-cols-3 items-center justify-center place-items-center w-full  mt-20  ">
      {stats.map((s) => {
        return (
          <div
            className="px-12  py-4 md:px-14 2xl:px-24 w-72 md:w-80 2xl:w-96 flex self-center rounded-xl justify-between items-center shadow-stat"
            key={s.name}
          >
            <div className=" text-center">
              <span className="text-[2rem] font-semibold">{s.value}+</span>
              <h2 className="text-[1.3rem] ">{s.name}</h2>
            </div>

            {<s.icon className="h-16" />}
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
}
