import type { PropertyType } from '@/types/PropertyType';

export type GetPropertyListParameters = {
    type: PropertyType;
    location?: number;
    // district, price_low, price_high, rooms_low, rooms_high, area_low, area_high, tatami (0/1), furnished (0/1), kitchen (0/1)
}