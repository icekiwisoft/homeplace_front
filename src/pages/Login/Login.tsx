import { login } from '@services/userApi';
import React, { FormEvent, useContext, useState } from 'react';

import Home from '../../assets/img/home.jpg';

export default function Login(): React.ReactNode {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password, true);
  };
  return (
    <div className='flex h-screen bg-gray-300'>
      <div className='bg-white px-12   w-96  flex'>
        <div className=' w-full m-auto '>
          <h2 className='text-[1.1rem] font-semibold text-gray-800  '>
            welcome to domilis
          </h2>
          <span className='text-[0.9rem] text-gray-500'>
            please sign in and start to search your dream{' '}
          </span>
          <form action='' className=' w-full' onSubmit={loginSubmit}>
            <div className='mt-5'>
              <input
                className='p-2  rounded-md bg-gray-100 outline-none  w-full'
                placeholder='email'
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
              />
            </div>
            <div className='mt-5'>
              <input
                className='p-2 rounded-md bg-gray-100 outline-none  w-full'
                type='password'
                placeholder='password'
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
              />
            </div>

            <div className=' text-gray-500 text-[0.9rem] flex justify-between mt-3 '>
              <span>
                <input
                  id='default-checkbox'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 align-middle mr-1 text-blue-600 bg-gray-100 rounded border-gray-300  dark:ring-offset-gray-800 '
                />
                remember me
              </span>

              <a className='text-orange-700' href='/Forgot'>
                forgot password
              </a>
            </div>

            <button className='p-2 mt-10 bg-gray-900 rounded-md text-gray-50 text-[1.1rem]  w-full'>
              login
            </button>

            <div className='text-center mt-5'>
              <span className='text-[0.9rem]'>
                Don't you have account{' '}
                <a className='text-orange-700' href='/Signup'>
                  sign up
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className=' flex-1 flex items-center h-full overflow-hidden'>
        <img src={Home} className='object-contain min-w-full' />
      </div>
    </div>
  );
}
