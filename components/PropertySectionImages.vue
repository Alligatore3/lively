<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

const propertyImages = computed<string[]>(() =>
  [property.image, property.image_2, property.image_3, property.image_4].filter(isString)
); // to be removed
</script>

<template>
  <section id="property-images">
    <UCarousel v-slot="{ item }" :items="propertyImages" :ui="{ item: 'basis-2/6	' }" class="overflow-hidden" arrows>
      <button @click="$router.back()" class="top-4 left-4 absolute bg-white rounded-md px-5 py-3 font-semibold">
        {{ $t('properties.back') }}
      </button>
      <img :src="item" class="w-full" draggable="false" />
    </UCarousel>
  </section>
</template>
