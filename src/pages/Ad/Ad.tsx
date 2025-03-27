import Piece from '@assets/piece.png';
import MediasDialog from '@components/MediasDialog/MediasDialog';
import Nav2 from '@components/Nav2/Nav2';
import ProductDetailCard from '@components/ProductDetailCard/ProductDetailCard';
import { getAd } from '@services/announceApi';
import React, { useEffect, useRef, useState } from 'react';



import {
  FaBed,
  FaDraftingCompass,
  FaHeart,
  FaLock,
  FaShareAlt,
  FaShower,
} from 'react-icons/fa';
import {
  HiAcademicCap,
  HiLockClosed,
  HiOutlineHeart,
  HiOutlineLockClosed,
  HiOutlineShare,
} from 'react-icons/hi2';
import {
  MdBed,
  MdOutlineCompassCalibration,
  MdOutlineShower,
  MdRule,
  MdSick,
} from 'react-icons/md';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '@components/Map/Map';

import { Ad as AdType } from '../../utils/types';
import Footer from '@components/Footer/footer';

// Configurez votre token Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Ad(): React.ReactElement {
  const { id } = useParams();
  const [adInfo, setAdInfo] = useState<AdType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(11.5021); // Coordonnées de Yaoundé
  const [lat] = useState(3.8480);
  const [zoom] = useState(12);
  const [isMapLocked, setIsMapLocked] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    getAd(id).then(ad => setAdInfo(ad));
  }, [id]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom,
      });

      // Ajout des contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Ajout d'un marqueur
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current);
    }
  }, [lng, lat, zoom]);

  const handleUnlockMap = () => {
    setIsMapLocked(false);
  };

  return (
    <>
      <Nav2 />
      <div className='px-2 sm:px-6 md:px-6 lg:px-10 bg-gray-200 mt-16 py-5'>
        <h1 className='text-xl md:test-2xl lg:text-2xl font-semibold  mb-5'>
          Chambre étudiant: Yaoundé Odza
        </h1>
        <div className='relative  bg-none'>
          <div className='grid h-96 rounded-lg overflow-hidden grid-cols-2 md:grid-cols-4 gap-2'>
            {/* Large Left Image */}
            <div className='col-span-2 md:col-span-2 row-span-2'>
              <img
                src='/path/to/large/image.jpg'
                alt='Main Project'
                className='w-full  h-full bg-gray-300'
              />
            </div>

            {/* Smaller Images */}
            <div>
              <img
                src='/path/to/smaller/image1.jpg'
                alt='Project Detail 1'
                className='w-full  h-full bg-gray-300'
              />
            </div>
            <div>
              <img
                src='/path/to/smaller/image2.jpg'
                alt='Project Detail 2'
                className='w-full  h-full bg-gray-300'
              />
            </div>
            <div>
              <img
                src='/path/to/smaller/image3.jpg'
                alt='Project Detail 3'
                className='w-full  h-full bg-gray-300'
              />
            </div>
            <div>
              <img
                src='/path/to/smaller/image4.jpg'
                alt='Project Detail 4'
                className='w-full  h-full bg-gray-300'
              />
            </div>
          </div>
          {showModal && <MediasDialog toggleModal={toggleModal} />}
          <button
            className='max-w-44 px-3 truncate border  py-1.5 rounded-xl text-sm bg-white border-gray-600 absolute bottom-3 right-3'
            onClick={toggleModal}
          >
            voir toutes les photo
          </button>
        </div>
        {/* Room Details */}
        <div className=' flex-col md:flex-row lg:flex-row xl:flex-row flex gap-10 mt-10 '>
          <div className='bg-white shadow-lg rounded-lg py-8 px-6 flex-1'>
            <div className='flex justify-between items-start mb-10'>
              <div>
                <p className='text-gray-500 text-sm'>Type de bien</p>
                <h2 className='text-xl font-semibold'>Chambre étudiant</h2>
              </div>
            </div>

            <div className='flex justify-center gap-5 my-10'>
              {[
                { icon: FaBed, value: 1, label: 'Chambre' },
                { icon: MdOutlineShower, value: 3, label: 'Douche' },
              ].map((item, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div className='flex gap-1'>
                    <item.icon size={28} />
                    <div className='flex flex-col'>
                      <span className='text-lg font-semibold'>
                        {item.value}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {item.label}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mb-6'>
              <h3 className='text-lg font-semibold mb-2'>
                À propos de ce logement
              </h3>
              <p className='text-gray-600 text-sm leading-relaxed h-28'>
                Cuisine récemment rénovée et chambre privée avec salle de bain
                privée attenante en carrelage noir et blanc/marbre dans cette
                charmante maison en pierre et cadre sur une rue tranquille
                bordée d'arbres avec beaucoup de stationnement gratuit...
                {/* (Truncated for brevity) */}
              </p>
            </div>

            <div className='flex justify-between items-center mb-10 '>
              <p className=' text-lg font-light '>15.000 FCFA/mois</p>
              <button className='bg-orange-500  flex gap-2 items-center justify-center hover:bg-orange-700 text-white font-semibold py-2 px-5 w-40 text-sm rounded-lg'>
                <img src={Piece} className='size-6 ' /> Débloquer
              </button>
            </div>
            <div className='flex items-center mt-4 justify-between'>
              <p className='text-gray-700 font-semibold text-xs  '>
                Ce logement fait partie des 10% de logements préférés sur
                Domilix
              </p>
              <div className=' flex  space-x-4 text-gray-800'>
                <HiOutlineShare className='size-8 p-1.5 rounded-full overflow-visible bg-gray-200 font-bold' />
                <HiOutlineHeart
                  className={
                    'size-8 p-1.5 rounded-full  font-bold ' +
                    (1 ? 'bg-orange-700/25 text-orange-700 ' : 'bg-gray-200')
                  }
                />
              </div>
            </div>

            {/* <p className="text-gray-500 text-xs mt-4">
              Ce logement est très bien classé, d'après ses évaluations, ses
              commentaires et la fiabilité de l'annonce selon les voyageurs.
            </p> */}
          </div>

          <div className=' w-80 bg-white  rounded-lg  shadow-lg'></div>
        </div>

        <Map 
          isLocked={isMapLocked}
          onUnlock={handleUnlockMap}
        />

        {/* Additio
      <Footer />shown in the image, but can be added here) */}
      </div>
      <Footer />
    </>
  );
}
