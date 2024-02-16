import { NavLink, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import './Nav2.scss'
import React, { useContext } from 'react'
import { HiHomeModern, HiMagnifyingGlass } from 'react-icons/hi2'
import { Badge } from '@material-tailwind/react'
import AuthContext from '../../context/AuthContext'

export default function Nav2(): React.ReactElement {
    const { user } = useContext(AuthContext);
    const navigate=useNavigate()
    const [UrlSearchParam,setUrlSearchParam]=useSearchParams()

    return (
        <nav className="relative w-[100%] ">
            <div className="h-[80px] flex justify-between border-0  border-gray-300  first-letter:  items-center text-black lg:py-3  py-2 ">
                <div className="flex items-center ">
                    <NavLink className="text-2xl font-bold flex" to="/">D<HiHomeModern className="h-auto" />milis</NavLink>
                </div>
                <div className='flex   rounded-full px-3 py-2 bg-blue-gray-50 border-solid items-center  '>
                <input type="text" placeholder="search ...." defaultValue={UrlSearchParam.get("search")!} className="  outline-none w-[200px] bg-transparent   text-[1rem]  text-gray-600  font-normal" onKeyDown={(e)=>{
                   if(e.key== 'Enter')
                     {
                          navigate({
                            pathname: "/announces",
                            search: createSearchParams({
                            search: e.currentTarget.value
                            }).toString()
                            })
                     }
                }}  />
<HiMagnifyingGlass size={28} className='text-gray-800'/>
                </div>
                <div className="lg:flex md:flex lg:  items center justify-end font-normal hidden">
                    <div className="flex-10 ">
                        <ul className="flex gap-8 text-[16px] font-medium items-center">
   
                            <NavLink  to="Services">
                                <li className=" hover:scale-110 transition-colors hover:font-semibold cursor-pointer">Contact us</li>
                            </NavLink>
                            {
                                user?.is_admin &&
                                <NavLink  to="/dashboard">
                                <li className=" hover:scale-110 transition-colors hover:font-semibold cursor-pointer">dashboard</li>
                            </NavLink>
                            }
           
                            {!user&&
                             <NavLink  to="/login">
                                <li className="transition-all duration-700  cursor-pointer bg-gray-900 hover:bg-gray-800 hover:rounded-3xl text-white font-bold py-2 px-4 rounded-lg "> Sign in</li>
                            </NavLink>
                            }

                        </ul>
                    </div>
                  
                </div>

            </div>
        </nav>
    )
}
