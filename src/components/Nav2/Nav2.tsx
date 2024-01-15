import { NavLink } from 'react-router-dom'
import Hero from './Hero/Hero'
import './Nav2.scss'
import React from 'react'
import { HiHomeModern } from 'react-icons/hi2'

export default function Nav2(): React.ReactElement {

    return (
        <nav className="relative w-[100%] ">
            <div className="h-[80px] flex justify-between border-0 border-b border-gray-300 border-solid first-letter:  items-center text-black lg:py-3 px-6 py-2 ">
                <div className="flex items-center ">
                    <NavLink className="text-2xl font-bold flex" to="/">D<HiHomeModern className="h-auto" />milis</NavLink>
                </div>
                <input type="text" placeHolder="search ...." className="border-0 border-b border-solid  border-gray-500  outline-none w-[432px] py-2 px-2 text-[1rem]  text-gray-600  font-normal"  />
                <div className="lg:flex md:flex lg:  items center justify-end font-normal hidden">
                    <div className="flex-10 ">
                        <ul className="flex gap-8 text-[16px] font-medium items-center">
                            <NavLink to="/">
                                <li className=" hover:scale-110 transition-colors border-b-white hover:font-semibold cursor-pointer">Accueil</li>
                            </NavLink>
                            <NavLink  to="Services">
                                <li className=" hover:scale-110 transition-colors hover:font-semibold cursor-pointer">Contact us</li>
                            </NavLink>
                            <NavLink  to="Services">
                                <li className="transition cursor-pointer bg-white hover:bg-orange-500 text-black font-bold py-2 px-4 rounded "> Sign up</li>
                            </NavLink>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    )
}
