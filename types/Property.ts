import type { Agency } from '@/types/Agency';

export type Property = {
  agency_image: Agency['image'];
  agency_name: Agency['name'];
  agency_slug: Agency['slug'];
  description: string;
  address: string;
  title: string;
  slug: string;
  id: number;
  id_agency: number;
  images: string[];
  id_location: number;
  id_district: number;
  type: number;
  price: number;
  condominium_fees: number;
  n_rooms: number;
  n_bathrooms: number;
  n_balconies: number;
  floor: number;
  area: number;
  deposit: number;
  agency_fee: number;
  thanks_fee: number;
  year_build: number;
  year_renewal: number;
  wifi: number;
  pet: number;
  parking: number;
  bike_parking: number;
  tatami_room: number;
  air_conditioning: number;
  furnished: number;
  kitchen: number;
  washlet: number;
  active: number;
}