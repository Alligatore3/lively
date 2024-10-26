<script setup lang="ts">
import type { Property } from '@/types/Property';
import LocationIcon from '@/components/icons/LocationIcon';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

const propertyAddressLink = computed<Property['address'] | null>(() => {
  const prefix = 'https://www.google.com/maps/search/?api=1&query=';
  return property.address ? `${prefix}${property.address}` : null;
});

/**
 * @see https://flowbite.com/docs/components/gallery/#masonry-grid
 */
const propertyImages = computed<string[]>(() =>
  [property.image, property.image_2, property.image_3, property.image_4].filter(isString)
); // to be removed
</script>

<template>
  <section id="property-images">
    <div class="flex gap-5 flex-col m-4 relative">
      <div class="overflow-hidden rounded-lg flex flex-row gap-4">
        <button @click="$router.back()" class="top-4 left-4 absolute bg-white rounded-md px-5 py-3 font-semibold">
          {{ $t('properties.back') }}
        </button>
        <div :key="index" v-for="(image, index) in propertyImages"><img :src="image" alt="" /></div>
      </div>

      <div class="flex gap-2">
        <LocationIcon class="text-black" />

        <NuxtLink
          v-if="propertyAddressLink"
          :to="propertyAddressLink"
          class="font-semibold underline"
          target="_blank"
          rel="noopener"
        >
          {{ property.address }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
