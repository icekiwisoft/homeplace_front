import React from 'react'
import Home from '../../assets/img/home.jpg'
export default function Signup (){
  return (
    <div className='flex h-screen bg-gray-300'>
            <div className='bg-white px-12   w-96  flex'>
        <div className=' w-full m-auto '>
        <h2 className='text-[1.1rem] font-semibold text-gray-800  '>welcome to domilis</h2>
        <span className='text-[0.9rem] text-gray-500' >please sign in and start to search your dream </span>
        <form action="" className=' w-full'>

        <div className='mt-5'>
            <input className='p-2 rounded-md bg-gray-100 outline-none  w-full' type='text' placeholder='name '/>
            </div>
            <div className='mt-5'>
            <input className='p-2  rounded-md bg-gray-100 outline-none  w-full' placeholder='email'/>
            </div>

            <div className='mt-5'>
            <input className='p-2 rounded-md bg-gray-100 outline-none  w-full' type='password' placeholder='password'/>
            </div>
            <div className='mt-5'>
            <input className='p-2 rounded-md bg-gray-100 outline-none  w-full' type='password' placeholder='password (confirmation)'/>
            </div>

           

           <button className='p-2 mt-10 bg-gray-950 rounded-md text-gray-50 text-[1.1rem]  w-full'>
           Signup
           </button>


           
           <div className='text-center mt-5'>
           <span className='text-[0.9rem]'>
           already have an account ,
           <a className='text-orange-700'>
            signin
           </a>
            </span>
            

            </div>
           
        </form>
        </div>

      </div>
      <div className=' flex-1 flex items-center h-full overflow-hidden'>
<img src={Home} className='object-contain min-w-full'/>
      </div>

    </div>
  )
}

