<script setup lang="ts">
import type { PropertyType } from '@/types/PropertyType';
import { isPropertyType } from '@/utils/isPropertyType';
import { isString } from '@/utils/isString';

const route = useRoute();

const type = computed<PropertyType | null>(() => (isPropertyType(route.query.type) ? route.query.type : null));

const location = computed<string | null>(() => (isString(route.query.location) ? route.query.location : null));

const priceRange = computed<number | null>(() =>
  typeof route.query.priceRange === 'number' && !isNaN(route.query.priceRange) ? route.query.priceRange : null
);
</script>

<template>
  <div class="flex flex-col md:flex-row p-4 h-full gap-4 md:gap-0">
    <div class="md:w-1/4 md:h-full">
      Current search:
      <br />
      <code>priceRange: {{ priceRange || 'Not defined' }} </code>
      <br />
      <code>location: {{ location || 'Not defined' }} </code>
      <br />
      <code>type: {{ type }} </code>
    </div>

    <div class="md:w-3/4 md:h-full overflow-y-scroll">
      <slot />
    </div>
  </div>
</template>
