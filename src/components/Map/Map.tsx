import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import { HiLockClosed } from 'react-icons/hi2';

// Définir le type pour les coordonnées
type Coordinates = [number, number];

const INITIAL_CENTER: Coordinates = [
  11.5021, // Longitude de Yaoundé
  3.8480   // Latitude de Yaoundé
]
const INITIAL_ZOOM = 12

interface MapProps {
  isLocked?: boolean;
  onUnlock?: () => void;
}

function Map({ isLocked = false, onUnlock }: MapProps) {

  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<mapboxgl.Marker | null>(null)

  const [center, setCenter] = useState<Coordinates>(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoibmdkcmVhbSIsImEiOiJjbTdpZHBlN2QxZTdxMm1zN2NudjEzY3k0In0.-CBtbQ5HY-w8DSGlm4Olyg'
      
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: center as [number, number],
        zoom: zoom,
        attributionControl: true
      });

      mapRef.current = map;

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      markerRef.current = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);

      map.on('move', () => {
        if (!map) return;
        const mapCenter = map.getCenter()
        const mapZoom = map.getZoom()
        setCenter([mapCenter.lng, mapCenter.lat])
        setZoom(mapZoom)
      })

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Erreur lors du chargement de la carte');
      });

    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Erreur lors de l\'initialisation de la carte');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      if (markerRef.current) {
        markerRef.current = null
      }
    }
  }, [])

  const handleResetView = () => {
    mapRef.current?.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      duration: 2000
    })
  }

  if (error) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-red-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-[500px] relative mt-4">
      <div className="absolute top-2 left-2 bg-white/90 p-2 rounded shadow-lg z-10 text-sm">
        <div>Longitude: {center[0].toFixed(4)}</div>
        <div>Latitude: {center[1].toFixed(4)}</div>
        <div>Zoom: {zoom.toFixed(2)}</div>
      </div>
      <button 
        className="absolute top-2 right-2 bg-white/90 px-4 py-2 rounded shadow-lg z-10 
                   hover:bg-gray-100 transition-colors duration-200 text-sm"
        onClick={handleResetView}
      >
        Recentrer
      </button>
      {isLocked && (
        <div className="absolute inset-0 z-20 bg-gray-900/50 backdrop-blur-sm 
                      flex items-center justify-center">
          <div className="text-center">
            <HiLockClosed className="w-16 h-16 text-white mb-4" />
            <button
              onClick={onUnlock}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 
                       rounded-lg transition-colors duration-200"
            >
              Débloquer
            </button>
          </div>
        </div>
      )}
      <div 
        ref={mapContainerRef}
        className="w-full h-full rounded-lg overflow-hidden shadow-lg"
      />
    </div>
  )

}

export default Map;