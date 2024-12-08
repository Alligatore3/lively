import type { PropertyType } from '@/types/PropertyType';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import { DEFAULT_PROPERTY_TYPE } from '@/constants';

export const generatePropertyQueryType = (route: RouteLocationNormalizedLoadedGeneric): PropertyType =>
  isString(route.query.type) ? (route.query.type === 'buy' ? 'buy' : 'rent') : DEFAULT_PROPERTY_TYPE;
