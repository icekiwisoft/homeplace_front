import Nav2 from '@components/Nav2/Nav2';
import ProductCard from '@components/ProductCard/ProductCard';
import { getAds } from '@services/announceApi';
import { Ad } from '@utils/types';
import React, { useCallback, useEffect, useState } from 'react';
import { HiAdjustmentsHorizontal, HiMagnifyingGlass } from 'react-icons/hi2';
import { Link, useSearchParams } from 'react-router-dom';

export default function Ads(): React.ReactElement {
  const [ads, setAds] = useState<Ad[]>([]);
  const [nextPage, setNextPage] = useState<string | null>('ads');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // State for filter sidebar
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [UrlSearchParam] = useSearchParams();

  const handleFilterButtonClick = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen); // Toggle filter sidebar visibility
  };

  const getMoreAds = useCallback(() => {
    setIsLoadingMore(true);
    getAds({
      page: 1,
      search: UrlSearchParam.get('search'),
    }).then(response => {
      setAds([...ads, ...response.data]);
      setNextPage(response.links.next);
      setIsLoadingMore(false);
    });
  }, [isLoadingMore, ads]);

  useEffect(() => {
    setNextPage('ads');
    setAds([]);
  }, [UrlSearchParam]);

  useEffect(() => {
    let canLoadMore = true;

    function handleScrollEvent() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoadingMore &&
        nextPage &&
        ads.length &&
        canLoadMore
      ) {
        canLoadMore = false;
        getMoreAds();
      }
    }

    if (!ads.length && !isLoadingMore) {
      console.log('test');
      getMoreAds();
    }

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [nextPage, isLoadingMore, getAds, ads]);

  return (
    <>
      <Nav2 />
      {isFilterSidebarOpen && (
        <div className='fixed z-30 border-r border-r-gray-300 shadow-lg left-0 w-80 bg-white h-[calc(100%-64px)] top-16 text-xs  py-3 px-4 '>
          {/* Budget Section */}
          <div className='mb-4'>
            <h2 className='font-bold mb-2 text-base'>Budget :</h2>
            <div className='flex space-x-2'>
              <input
                type='number'
                placeholder='min'
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='max'
                className='w-full p-2 border rounded'
              />
            </div>
          </div>

          {/* Categories Section */}
          <div className='mb-4'>
            <h2 className='font-bold mb-2 text-base'>Categories :</h2>
            <div>
              {[
                'Chambre',
                'Studio',
                'Appartement',
                'Maison',
                'Villa',
                'Bureau',
              ].map(category => (
                <label key={category} className='block mb-1'>
                  <input type='checkbox' className='mr-2' />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Standing Section */}

          <div className='mb-4'>
            <h2 className='font-bold mb-2 text-base'>Standing :</h2>
            <div>
              {['Standard', 'Confort', 'Haut Standing'].map(standing => (
                <label key={standing} className='block mb-1'>
                  <input type='radio' name='standing' className='mr-2' />
                  {standing}
                </label>
              ))}
            </div>
          </div>

          {/* Number of Rooms Section */}
          <div className='mb-4'>
            <h2 className='font-bold mb-2 text-base'>Nombre de Chambres :</h2>
            <div className='flex space-x-2'>
              <input
                type='number'
                placeholder='min'
                className='w-full p-2 border rounded'
              />
              <input
                type='number'
                placeholder='max'
                className='w-full p-2 border rounded'
              />
            </div>
          </div>
        </div>
      )}

      <div className='bg-white fixed top-16 w-screen justify-center flex items-center md:justify-between lg:justify-between px-10  py-3'>
        <div className='flex'>
          <span className='hidden lg:block'>Toutes les</span>&nbsp;
          <span className='capitalize lg:normal-case md:normal hidden xl:block lg:block md:block '>
            categories
          </span>
        </div>
        &nbsp;
        <div className='flex w-96  rounded-[10px] px-3 py-2.5 bg-gray-200 border-solid items-center  '>
          <HiMagnifyingGlass size={24} className='text-gray-800' />
          <input
            type='text'
            placeholder='Ville, quartier...'
            defaultValue={UrlSearchParam.get('search')!}
            className='  outline-none flex-1 bg-transparent px-2  text-[1rem]  text-gray-600  font-normal'
          />
        </div>{' '}
        &nbsp;
        <button
          className={
            (isFilterSidebarOpen && 'bg-gray-200 ') +
            ' inline-flex py-2 px-4 rounded-lg  items-center gap-2 text-gray-800'
          }
          onClick={handleFilterButtonClick}
        >
          {' '}
          <HiAdjustmentsHorizontal size={24} />
          <span className=' hidden lg:block md:block '>filtre avancé</span>
        </button>
      </div>

      <div className="bg-gray-200 min-h-screen">
        <section
          className={
            ' ' +
            (isFilterSidebarOpen
              ? 'ml-80'
              : '') +
            'grid gap-y-[35px] gap-x-[20px] mt-32 py-4 px-4 justify-center'
          }
          style={{
            width: isFilterSidebarOpen ? 'calc(100% - 320px)' : '100%',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 350px))',
          }}
        >
          {ads.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            ads.map(ad => <ProductCard {...ad} key={ad.id} />)
          )}
        </section>
      </div>
    </>
  );
}
