import type { PropertyType } from '@/types/PropertyType';

export const LIVELY_BASE_URL = 'https://api.livelyjapan.com/v1/public/';

export const DEFAULT_PROPERTY_TYPE: PropertyType = 'buy';

export enum ROUTES {
  PROPERTY = '/property/:slug',
  PROPERTIES = '/properties',
  AGENCY = '/agency/:slug',
  AGENCIES = '/agencies',
  SEARCH = '/search',
  HOME = '/',
}
