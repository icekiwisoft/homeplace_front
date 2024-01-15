import React from 'react'
import { MdCategory } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import UserCard from '../../../components/Dashboard/UserCard/UserCard';

export default function Announcers() {
    return (
        <>
        <div>
   <input type="text" placeholder="search ...." className="border-0 border-b border-solid  border-gray-500  outline-none max-w-md  w-full py-2 px-2 text-[1rem]  text-gray-600  font-normal"  />
            
        </div>
            <div className="p-4">
            <UserCard/>
            </div>
        </>
    )
}


