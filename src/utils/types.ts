// a furniture ad type can be a location or a sale
export enum AdType {
  location,
  sale,
}

//interface for announcer
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

//interface for media
export interface Media {
  file: string;
  thumbnail: string;
  id: string;
}

//interface for ad
export interface Ad {
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

export interface User {
  name: string;
  email: string;
  is_admin: boolean;
  credits: number;
  domicoin: number;
}

export interface Category {
  name: string;
  items: number;
  id: string;
  type: number;
  creation_date: string;
}

export interface TimerProps {
  targetDate: Date;
}

export interface OfferDetailsProps {
  title: string;
  credit: string;
  validity: string;
  price: string;
  features: string[];
  onClose: () => void;
}

export interface PricingProps {
  title: string;
  credits: string;
  validity: string;
  price: string;
  features: string[];
  isActive: boolean;
  onChoose: () => void;
}

export interface PhoneProps {
  value: string;
  onChange: (phone: string) => void;
}
