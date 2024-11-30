import AuthContext from '@context/AuthContext';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Domilix from '../../assets/domilix_icon.png';
import { Ad } from '../../utils/types';

export default function ProductCard(props: Ad): React.ReactElement {
  const { price, presentation, id }: Ad = props;
  const navigate = useNavigate();
  const { user, toggleModal } = { user: 'user', toggleModal: () => {} };
  const [liked, setLike] = useState(false);
  const like = () => {
    if (user) toggleModal!();
    else setLike(!liked);
  };

  return (
    <Link
      to={'/houses/' + id}
      target='_blank'
      className=' shadow-lg overflow-hidden cursor-pointer rounded-2xl px-4 py-3 bg-white '
    >
      <div className='h-44 bg-gray-300 rounded-lg overflow-hidden'>
        {
          <img
            alt='product'
            className=' object-cover min-h-full min-w-full  w-full'
            src={'http://localhost:8000' + presentation}
          />
        }
      </div>
      <div className='mt-2 flex justify-between items-center '>
        <span className='text-gray-800 font-light '>{price}/mois</span>
        <span className='font-semibold rounded-2xl py-1 px-3 bg-gray-300 text-[10px] text-gray-800 '>
          négociable
        </span>
      </div>
      <div className='mt-1 flex justify-between items-center '>
        <h3 className='font-semibold  text-sm'>Appartement</h3>

        <span className='text-gray-600  text-xs '>yaounde/odza</span>
      </div>
      <div className='mt-3 flex justify-between items-center '>
        <div
          className='flex gap-2.5'
          onClick={e => {
            e.preventDefault();
          }}
        >
          <button
            className='size-8 p-1.5 rounded-full bg-gray-200'
            title='share'
          >
            <ShareIcon />
          </button>

          <button
            className={
              'size-8 p-1.5 rounded-full ' +
              (liked ? 'bg-orange-700/25 text-orange-700 ' : 'bg-gray-200')
            }
            title='like'
            onClick={like}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
    </Link>
  );
}
