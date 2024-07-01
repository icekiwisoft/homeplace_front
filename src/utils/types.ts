// a furniture ad type can be a location or a sale
export enum AdType {
  location,
  sale,
}

export interface Announcer {
  name: string;
  avatar: string;
  furnitures: number;
  houses: number;
  contact: string;
  email: string;
  verified: boolean;
  id: string;
  bio: string;
  creation_date: string;
}

export interface Media {
  file: string;
  thumbnail: string;
  id: string;
}

export interface AdBase {
  description: string;
  item_type: AdType;
  ad_type: AdType;
  medias: number;
  presentation: string;
  mediasCount: number;
  category: Category;
  id: string;
  price: number;
  announcer: Announcer;
  creation_date: string;
}

export interface FurnitureAd extends AdBase {}

export interface HouseAd extends AdBase {
  pallor: number;
  bathroom: number;
  kitchen: number;
  room: number;
}

export type Ad = FurnitureAd | HouseAd;

export interface User {
  name: string;
  email: string;
  is_admin: boolean;
  domicoin:number
}

export interface Category {
  name: string;
  items: number;
  id: string;
  type: number;
  creation_date: string;
}
