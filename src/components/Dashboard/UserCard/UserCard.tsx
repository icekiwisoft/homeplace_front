import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import user from '../../../assets/img/user.png';
export default function UserCard() {
    return (
        <Link to={"/dashboard/announcers/1"} className="flex flex-col items-center justify-center h-28 rounded w-72 bg-gray-100 border shadow-md p-4 ">
            <div className='flex justify-between w-full'>
                <div className=" w-16 h-16">
                    <img src={user} className=" object-fill" />
                </div>
                <div>
                    <h2 className="font-semibold text-[1rem]"> domilis announcers</h2>
                    <time className="font-light text-[1rem]">22/23/2</time>
                </div>

            </div>


        </Link>

    )
}