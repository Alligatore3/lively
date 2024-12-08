import type { Property } from '@/types/Property';

export type Agency = {
  active: number;
  id_location: number;
  id: number;
  name: string;
  description: string;
  properties: Property[];
  image: string;
  slug: string;
  address: string;
  mobile: string;
  email: string;
};
