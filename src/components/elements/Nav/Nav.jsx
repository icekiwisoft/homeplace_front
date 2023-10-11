import { HiHomeModern } from "react-icons/hi2";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { Link } from "react-scroll";
import {FaTimes} from "react-icons/fa";
import "./Nav.css"


export default function Nav() {
    const [click, setClick] = useState(false);
    const handleClick = () =>  setClick(!click);
  
    const content = <>
        <div className="lg:hidden text-black bg-slate-800 absolute z-50 block top-12 w-full left-0 right-0 transition">
            <ul className="text-center text-xs">
                <Link spy={true} smooth={true} to="Home">
                    <li className="my-2 py-2 border-b border-slate-500 hover:bg-white hover:rounded">Accueil</li>
                </Link >
                <Link spy={true} smooth={true} to="About">
                    <li className="my-2 py-2 border-b border-slate-500 hover:bg-white hover:rounded">Service</li>
                </Link>
                <Link spy={true} smooth={true} to="Services">
                    <li className="my-2 py-2 p-bottom-2 hover:bg-white hover:rounded">Contact us</li>
                </Link>
            </ul>
        </div>
    </>
  return (
    <nav>
            <div className="h-5vh flex justify-between z-50 text-white lg:py-3 px-6 py-2 border-b">
                <div className="flex items-center flex-1">
                    <span className="text-2xl font-bold flex">D<HiHomeModern className="h-auto"/>milis</span>
                </div>
                <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
                    <div className="flex-10">
                        <ul className="flex gap-8 text-[18px]">
                            <Link spy={true} smooth={true} to="Home">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-black hover:border-fuchsia-600 cursor-pointer">Accueil</li>
                            </Link>
                            <Link spy={true} smooth={true} to="About">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-black hover:border-fuchsia-600 cursor-pointer">Service</li>
                            </Link>
                            <Link spy={true} smooth={true} to="Services">
                                <li className="hover:text-fuchsia-600 transition border-b-2 border-black hover:border-fuchsia-600 cursor-pointer">Contact us</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div>
                    {click && content}
                </div>
                <button className="block sm:hidden transtion" onClick={handleClick}>
                    {click ? <FaTimes className="text-2xl"/> : <HiBars3 className="text-4xl"/>}
                </button>
            </div>
        </nav>
  )
}
