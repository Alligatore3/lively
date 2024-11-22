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
  <section id="property-images" class="relative">
    <UButton
      class="top-4 left-4 absolute rounded-md px-5 py-3 font-semibold z-10"
      icon="i-heroicons-arrow-left-20-solid"
      :label="$t('properties.back')"
      @click="$router.back()"
      :trailing="false"
      color="white"
      variant="solid"
      size="sm"
    />

    <UCarousel
      class="overflow-hidden max-h-80"
      :ui="{ item: 'basis-2/6' }"
      :items="propertyImages"
      v-slot="{ item }"
      arrows
    >
      <img :src="item" class="w-full" draggable="false" />
    </UCarousel>
  </section>
</template>
