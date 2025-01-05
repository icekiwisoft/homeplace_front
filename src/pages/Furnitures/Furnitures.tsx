import Nav2 from '@components/Nav2/Nav2';
import Timer from '@components/Timer/Timer';
import React from 'react';

export default function Furnitures(): React.ReactElement {
  const targetDate = new Date('2025-01-29T23:59:59');
  return (
    <>
      <Nav2 />
      <section
        className={
          ' ' +
          ' bg-gray-200 py-4 min-h-screen flex flex-col items-center justify-center 2xl:px-10 xl:px-6 gap-y-14'
        }
      >
        <div className='flex flex-col gap-6 justify-center'>
          <h1 className='lg:text-5xl sm:text-4xl text-3xl text-black text-center font-semibold'>
            Bientôt disponible !
          </h1>
          <p className='text-gray-800 lg:text-sm text-xs text-center px-[15%]'>
            Nous travaillons d'arrache-pied pour vous proposer un nouveau
            service super cool. Reste connecté(e) pour en savoir plus.
          </p>
        </div>
        <Timer targetDate={targetDate} />
      </section>
    </>
  );
}
