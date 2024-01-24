import { HiHomeModern } from "react-icons/hi2";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./Nav.scss"
import React from "react";
import { Link } from "react-router-dom";


export default function Nav(): React.ReactElement {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const content = <>
        <div className="md:hidden text-black bg-[#fff] h-screen absolute z-[3] block top-[80px] w-full left-0 right-0 transition">
            <ul className="text-center  text-xs mt-16 z-[50000] transition-all ">

                <Link spy={true} smooth={true} to="Home">
                    <li className="my-2 py-2 hover:bg-white hover:rounded">Accueil</li>
                </Link >
                
                <Link spy={true} smooth={true} to="Home">
                    <li className="my-2 py-2 hover:bg-white hover:rounded">dashboard</li>
                </Link >
                <Link spy={true} smooth={true} to="Services">
                    <li className="my-2 py-2 hover:bg-white hover:rounded">Contact us</li>
                </Link>
                <Link spy={true} smooth={true} to="Services">
                    <li className="transition cursor-pointer bg-[#D88A3B] text-white font-bold py-2 my-2 mx-[10vw] rounded"> Sign up </li>
                </Link>
            </ul>
        </div>
    </>

    return (
        <nav className={`relative w-[100%]  z-4  ${click? "active":""}  `}>
            <div className="bg-[#000000] z-20 absolute w-full h-[80px] colorer"></div>
            <div className={`h-[80px] flex justify-between first-letter:  items-center text-white lg:py-3 px-6 py-2 border-b relative z-50`}>
                <div className="flex items-center flex-1 ">
                    <span className="text-2xl font-bold flex">D<HiHomeModern className="h-auto" />milis</span>
                </div>
                <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
                    <div className="flex-10 ">
                        <ul className="flex gap-8 text-[16px] font-medium items-center">
                            <Link  to="">
                                <li className=" hover:scale-110 transition-colors border-b-white hover:font-semibold cursor-pointer">Accueil</li>
                            </Link>
                            <Link  to="">
                                <li className=" hover:scale-110 transition-colors hover:font-semibold cursor-pointer">Contact us</li>
                            </Link>
                            <Link to="dashboard">
                    <li className="hover:scale-110 transition-colors hover:font-semibold cursor-pointer">dashboard</li>
                </Link >
                         
                                <li className="transition cursor-pointer bg-white hover:bg-[#D88A3B] hover:text-white text-black font-bold py-2 px-4 rounded "> 
                                <Link   to="/login">
                                Sign in
                                </Link>
                                </li>

                        </ul>
                    </div>
                </div>
                <button className="block md:hidden " onClick={handleClick}>
                    {click ? <FaTimes className="text-2xl" /> : <HiBars3 className="text-4xl" />}
                </button>
            </div>

            {click && content}

        </nav>
    )
}
