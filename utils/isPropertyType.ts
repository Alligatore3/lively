import type { PropertyType } from '@/types/PropertyType';
import { isString } from './isString';

export function isPropertyType(value: unknown): value is PropertyType {
  return isString(value) && (value === 'buy' || value === 'rent');
}
