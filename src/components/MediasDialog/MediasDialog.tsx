import { useState } from 'react';

const images = [
  'https://loremflickr.com/732/581', // Replace with your image URLs
  'https://loremflickr.com/732/582',
  'https://loremflickr.com/732/583',
  'https://loremflickr.com/732/583',
  'https://loremflickr.com/732/584',
  'https://loremflickr.com/732/585',
  'https://loremflickr.com/732/586',
  'https://loremflickr.com/732/587',

  // Add more image URLs
];

export default function MediasDialog({ toggleModal }) {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const changeImage = image => {
    setCurrentImage(image);
  };
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50  z-50  flex items-center justify-center'
      onClick={toggleModal}
    >
      <div
        className='bg-white w-[1080px] max-w-screen-xl h-[580px] rounded-lg p-6 bottom-0 relative  shadow-lg absolute'
        onClick={e => e.stopPropagation()}
      >
        <button
          className='absolute top-5 right-3 text-lg text-gray-700'
          onClick={toggleModal}
        >
          ✖
        </button>
        <h2 className='text-2xl font-bold mb-6'>medias de l'annonce</h2>

        <div className='flex h-[500px] py-5'>
          <div className='w-full overflow-hidden  rounded-lg'>
            <img
              src={currentImage}
              alt='Current'
              className='w-full object-cover'
            />
          </div>
          <div className='w-1/4 ml-4 overflow-y-auto flex-grow'>
            {images.map((image, index) => (
              <div
                key={index}
                className='mb-2 cursor-pointer'
                onClick={() => changeImage(image)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-full h-24 object-cover rounded-lg'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
