import React from 'react'
import Home from '../assets/img/home.jpg'
import { useNavigate } from 'react-router-dom'
export default function Logout (){

    const navigate=useNavigate()
  return (
    <div className='flex h-screen  items-center justify-center w-full bg-white'>

      {/* <div className='  flex items-center h-full overflow-hidden'>
<img src={Home} className='object-contain min-w-full'/>
      </div> */}

      <div className='absolute bg-white rounded-lg drop-shadow-lg shadow-gray-200 p-4  w-96'>
        <h2 className='text-gray-900'>goodbye friend</h2>
        <p className='my-4 text-gray-600'>we're sad to see you go , are you really sure to logout ??? </p>
        <button className='w-full border-red-900 border border-solid text-red-900   p-4 rounded-lg'>
yes i'am sure
        </button>

        <button className='w-full border-green-900 border mt-3 border-solid text-green-900   p-4 rounded-lg' onClick={()=>navigate(-1)}>
no i stay with you
        </button>

      </div>

    </div>
  )
}

