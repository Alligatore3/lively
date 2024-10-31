import type { PropertyType } from '@/types/PropertyType';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

export const generatePropertyQueryType = (route: RouteLocationNormalizedLoadedGeneric):PropertyType => isString(route.query.type) ? (route.query.type === 'buy' ? 'buy' : 'rent') : 'rent';