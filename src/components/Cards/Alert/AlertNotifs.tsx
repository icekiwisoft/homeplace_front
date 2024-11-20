import React, { useEffect, useState } from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true);
  }, []);

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg
            viewBox='0 0 24 24'
            className='text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3'
          >
            <path
              fill='currentColor'
              d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            viewBox='0 0 24 24'
            className='text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3'
          >
            <path
              fill='currentColor'
              d='M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z'
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            viewBox='0 0 24 24'
            className='text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 mr-3'
          >
            <path
              fill='currentColor'
              d='M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z'
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`border-l-4 rounded mb-4 absolute top-3 left-1/2 transform -translate-x-1/2 
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} 
      transition-all duration-500 ease-out ${getAlertStyles()}`}
    >
      <div className='px-6 py-2 my-2 rounded-md text-lg flex items-center mx-auto min-w-[300px] max-w-lg'>
        <div className='flex-shrink-0'>
          <span className='text-2xl'>{getIcon()}</span>
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
