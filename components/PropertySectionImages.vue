<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

/**
 * @see https://flowbite.com/docs/components/gallery/#masonry-grid
 */
const propertyImages = computed<string[]>(() =>
  [property.image, property.image_2, property.image_3, property.image_4].filter(isString)
); // to be removed
</script>

<template>
  <section id="property-images">
    <div class="m-4 relative overflow-hidden rounded-lg flex flex-row gap-4">
      <button @click="$router.back()" class="top-4 left-4 absolute bg-white rounded-md px-5 py-3 font-semibold">
        {{ $t('properties.back') }}
      </button>
      <div :key="index" v-for="(image, index) in propertyImages"><img :src="image" alt="" /></div>
    </div>
  </section>
</template>
