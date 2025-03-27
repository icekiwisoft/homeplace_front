// Utilitaire pour la gestion de Mapbox
import mapboxgl from 'mapbox-gl';

export const initializeMapbox = () => {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
};

export const createMap = (
  container: HTMLElement,
  options: {
    longitude: number;
    latitude: number;
    zoom: number;
  }
) => {
  const { longitude, latitude, zoom } = options;
  
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [longitude, latitude],
    zoom,
  });

  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  return map;
}; 