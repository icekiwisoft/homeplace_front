import React, { useEffect, useState } from 'react';
import { TimerProps } from 'utils/types';

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();
    let timeLeft = {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24)
          .toString()
          .padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60)
          .toString()
          .padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='text-center mx-auto w-96 py-4 px-4'>
      <div className='flex items-center justify-center w-full lg:gap-8 sm:gap-5 gap-1 count-down-main'>
        <div className='timer'>
          <div className="pl-1.5 pr-0 py-1 rounded relative bg-orange-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className='countdown-element hours font-manrope font-semibold lg:text-4xl sm:text-3xl text-lg text-orange-600 tracking-[16px] pl-2 w-full text-center relative z-20'>
              {timeLeft.days}
            </h3>
          </div>
          <p className=' lg:text-sm text-xs font-normal text-gray-700 mt-1 text-center w-full'>
            jours
          </p>
        </div>
        <h3 className='font-manrope font-semibold text-xl text-gray-700'>:</h3>
        <div className='timer'>
          <div className="pl-1.5 pr-0 py-1 rounded relative bg-orange-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className='countdown-element hours font-manrope font-semibold lg:text-4xl sm:text-3xl text-lg text-orange-600 tracking-[16px] pl-2 w-full text-center relative z-20'>
              {timeLeft.hours}
            </h3>
          </div>
          <p className=' lg:text-sm text-xs font-normal text-gray-700 mt-1 text-center w-full'>
            heures
          </p>
        </div>
        <h3 className='font-manrope font-semibold text-xl text-gray-700'>:</h3>
        <div className='timer'>
          <div className="pl-1.5 pr-0 py-1 rounded relative bg-orange-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className='countdown-element minutes font-manrope font-semibold lg:text-4xl sm:text-3xl text-lg text-orange-600 tracking-[16px] pl-2 w-full text-center relative z-20'>
              {timeLeft.minutes}
            </h3>
          </div>
          <p className=' lg:text-sm text-xs font-normal text-gray-700 mt-1 text-center w-full'>
            minutes
          </p>
        </div>
        <h3 className='font-manrope font-semibold text-xl text-gray-700'>:</h3>
        <div className='timer'>
          <div className="pl-1.5 pr-0 py-1 rounded relative bg-orange-50 w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3 className='countdown-element seconds font-manrope font-semibold lg:text-4xl sm:text-3xl text-lg text-orange-600 tracking-[16px] pl-2 w-full text-center relative z-20'>
              {timeLeft.seconds}
            </h3>
          </div>
          <p className=' lg:text-sm text-xs font-normal text-gray-700 mt-1 text-center w-full'>
            secondes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timer;
