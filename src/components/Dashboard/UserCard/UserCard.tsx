import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

export default function UserCard()
{
    return(
        <div className="flex flex-col items-center justify-center h-28 rounded bg-gray-100 border shadow-md p-4 ">
        <div className='flex justify-between w-full'>
            <div>
                <p>Total Category </p>
                <h2>5</h2>
            </div>
            <div>
                <MdPerson className=' text-blue-700 text-[3.5rem]' />
            </div>
        </div>
        <div className='flex items-center gap-1 w-full justify-between'>
            <button className='flex items-center gap-1 bg-green-200 font-light text-[13px] rounded-full text-green-400 p-2'>
                <FaArrowUp /> 100k
            </button>
            <p className=' text-gray-500 font-light'>Total furniture's</p>
        </div>

    </div>

    )
}