import mapboxgl from 'mapbox-gl';

declare module 'mapbox-gl' {
  export interface MapboxOptions {
    container: HTMLElement | string;
    style?: string;
    center?: LngLatLike;
    zoom?: number;
    attributionControl?: boolean;
  }

  export type LngLatLike = [number, number] | { lng: number; lat: number };

  export interface Map {
    addControl(control: IControl, position?: string): this;
    on(type: string, listener: (ev: any) => void): this;
    remove(): void;
    getCenter(): { lng: number; lat: number };
    getZoom(): number;
    flyTo(options: {
      center: LngLatLike;
      zoom?: number;
      duration?: number;
    }): this;
  }

  export interface IControl {
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
  }

  export class NavigationControl implements IControl {
    constructor();
    onAdd(map: Map): HTMLElement;
    onRemove(map: Map): void;
  }

  export class Marker {
    constructor();
    setLngLat(lngLat: LngLatLike): this;
    addTo(map: Map): this;
  }
} 