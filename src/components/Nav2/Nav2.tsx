import {
  NavLink,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import React, { useContext, useState } from "react";
import AuthContext from "@context/AuthContext";
import Logo from "@assets/domilix.png";
import Piece from "@assets/piece.png";

import { HeartIcon } from "@heroicons/react/24/outline";
import SigninDialog from "@components/SigninDialog/SigninDialog";
const links = [
  { name: "Abonnements", url: "/subscriptions" },
  { name: "Immobiliers", url: "/houses" },
  { name: "Mobiliers", url: "/furnitures" },
];
export default function Nav2(): React.ReactElement {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [UrlSearchParam, setUrlSearchParam] = useSearchParams();
  const { toggleModal } = useContext(AuthContext)
  const domicoins = 2000
  return (
    <nav className="bg-white top-0 left-0 fixed w-[100%] px-10 border-b border-gray-400 z-50 ">
      <div className="h-[64px] flex justify-between border-0  border-gray-200  first-letter:  items-center text-black   ">
        <div className="flex items-center ">
          <NavLink className="text-2xl font-bold flex" to="/">
            <img src={Logo} alt="logo" className=" h-5" />
          </NavLink>
        </div>
        <div className="text-sm h-full">
          {links.map((link) => {
            return (
              <NavLink
                to={link.url}
                key={link.name}
                className="w-28 group justify-center relative h-full   group:  inline-flex items-center flex-col"
              >
                <span className="py-1">{link.name}</span>
                <div className="w-0 h-0.5 absolute bottom-0  group-[.active]:w-full transition-all duration-500 bg-black "></div>
              </NavLink>
            );
          })}
        </div>

        <div className="lg:flex md:flex lg:  items center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 text-[16px] font-medium items-center">
              <li className=" text-sm  ">
                <NavLink
                  to="/subscriptions"
                  className={
                    "inline-flex justify-center gap-1.5 items-center align-middle cursor-pointer"
                  }
                >
                  <img src={Piece} alt="coin" className="size-6" />
                  <strong className="text-yellow-800 ">{domicoins}</strong>
                </NavLink>
              </li>
              <NavLink to="/favorite">
                <li className=" text-sm inline-flex justify-center gap-2 items-center align-middle cursor-pointer">
                  <HeartIcon className="h-6 " /> Mes favoris
                </li>
              </NavLink>
              {user?.is_admin && (
                <NavLink to="/dashboard">
                  <li className="  cursor-pointer">dashboard</li>
                </NavLink>
              )}

              {!user && (
                <li>
                  <button
                    onClick={toggleModal}
                    className="transition-all duration-700  cursor-pointer bg-black hover:bg-gray-800 hover:rounded-3xl text-white font-bold py-2 px-4 rounded-lg "
                  >
                    Se connecter
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

    </nav>
  );
}
