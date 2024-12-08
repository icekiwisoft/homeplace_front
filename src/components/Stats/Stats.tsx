import { getStat } from '@services/statApi';
import React, { useEffect, useState } from 'react';

export default function Stats(): React.ReactElement {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    getStat().then((stats: any) => {
      setStats(stats);
    });
  }, []);
  return stats.length ? (
    <div className='md:px-10 px-5  grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 items-center justify-center place-items-center w-full  mt-20 gap-8  '>
      {stats.map(s => (
        <div
          className='px-12 max-w-full  py-4 md:px-14 2xl:px-24 w-72 md:w-80 2xl:w-96 flex self-center rounded-xl justify-between items-center shadow-stat'
          key={s.name}
        >
          <div className=' text-center'>
            <span className='text-[2rem] font-semibold'>{s.value}+</span>
            <h2 className='text-[1.3rem] '>{s.name}</h2>
          </div>

          {<s.icon className='h-16' />}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}
