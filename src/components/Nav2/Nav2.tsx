import {
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import React, { useContext, useState } from "react";
import AuthContext from "@context/AuthContext";
import Logo from "@assets/domilix.png";
import Piece from "@assets/piece.png";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HiBars3 } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";
import { GoX } from "react-icons/go";
import { GoQuote } from "react-icons/go";


const links = [
  { name: "Abonnements", url: "/subscriptions" },
  { name: "Immobiliers", url: "/houses" },
  { name: "Mobiliers", url: "/furnitures" },
];

export default function Nav2(): React.ReactElement {
  const { user, toggleModal } = useContext(AuthContext);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const domicoins = 2000;

  const content = (
    <>
      <div className="md:hidden text-black bg-white h-screen absolute z-[3] top-[64px] w-full left-0 right-0 transition">
        <ul className="text-center text-xs mt-16 z-[50000] transition-all">
          {links.map((link) => (
            <NavLink to={link.url} key={link.name}>
              <li className="my-2 py-2 hover:bg-gray-200 hover:rounded">
                {link.name}
              </li>
            </NavLink>
          ))}
          {user && (
            <NavLink to="/dashboard">
              <li className="my-2 py-2 hover:bg-gray-200 hover:rounded">
                Dashboard
              </li>
            </NavLink>
          )}
          {!user && (
            <li>
              <button
                onClick={toggleModal}
                className="transition-all duration-700 cursor-pointer bg-black hover:bg-gray-800 text-white font-bold py-2 my-2 mx-[10vw] rounded-lg"
              >
                Se connecter
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );

  return (
    <nav className="bg-white top-0 left-0 fixed w-[100%] px-10 border-b border-gray-400 z-50">
      <div className="h-[64px] flex justify-between items-center text-black">
        <div className="flex items-center">
          <NavLink className="text-2xl font-bold flex" to="/">
            <img src={Logo} alt="logo" className="h-5" />
          </NavLink>
        </div>
        <div className="lg:flex md:flex hidden items-center justify-end font-normal">
          <div className="flex-10">
            <ul className="flex gap-8 text-[16px] font-medium items-center">
              <li className="text-sm">
                <NavLink
                  to="/subscriptions"
                  className="inline-flex justify-center gap-1.5 items-center"
                >
                  <img src={Piece} alt="coin" className="size-6" />
                  <strong className="text-yellow-800">{domicoins}</strong>
                </NavLink>
              </li>
              <NavLink to="/favorite">
                <li className="text-sm inline-flex justify-center gap-2 items-center">
                  <HeartIcon className="h-6" /> Mes favoris
                </li>
              </NavLink>
              {user?.is_admin && (
                <NavLink to="/dashboard">
                  <li className="cursor-pointer">Dashboard</li>
                </NavLink>
              )}
              {!user && (
                <li>
                  <button
                    onClick={toggleModal}
                    className="transition-all duration-700 cursor-pointer bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Se connecter
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <button className="block md:hidden" onClick={handleClick}>
          {click ? <GoX className="text-2xl" /> : <GoQuote className="text-2xl" />}
        </button>
      </div>
      {click && content}
    </nav>
  );
}
