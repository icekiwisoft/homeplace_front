import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import user from '../../../assets/img/user.png'
export default function UserInfoCard()
{
    return(

        <div className="flex gap-10 h-96">

<div className="flex flex-col items-center h-full flex-1 justify-center h-28 rounded bg-gray-100 border shadow-md p-4 ">

<img src={user} alt="" className="aspect-square  h-[300px] rounded-full bg-red-950"/>
    </div>

    
<div className=" h-full  flex-1 justify-center  py-9 rounded bg-gray-100 border shadow-md p-4 ">
<h2 className="font-bold text-gray-900">monjos</h2>
<p className="mt-8 font-light ">jeux de damme en pagaille  jeux de damme en pagaillejeux de damme en pagaille</p>
<div>
    <ul className="my-10">
        <li>ngdream1953@gmail.com</li>
        <li>+237 672 00 59 34</li>
        <li></li>
    </ul>
<button className="transition cursor-pointer hover:text-white text-white font-bold py-2 px-4 rounded-lg bg-gray-900 w-36 "> poster </button>

</div>
</div>
        </div>


    )
}