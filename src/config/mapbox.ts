import mapboxgl from 'mapbox-gl';

// Utilisez votre clé API publique Mapbox
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmdkcmVhbSIsImEiOiJjbTdpZHBlN2QxZTdxMm1zN2NudjEzY3k0In0.-CBtbQ5HY-w8DSGlm4Olyg';

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error('Mapbox access token is required');
}

// Configurez le token
(mapboxgl as any).accessToken = MAPBOX_ACCESS_TOKEN;

export default mapboxgl; 