import type { PropertyType } from '@/types/PropertyType';

export type GetPropertyListParameters = {
  type: PropertyType;
  location?: number;
  area_low?: number;
  area_high?: number;
  price_low?: number;
  price_high?: number;
  rooms_low?: number;
  rooms_high?: number;
  furnished?: 0 | 1;
  kitchen?: 0 | 1;
  tatami?: 0 | 1;
};
