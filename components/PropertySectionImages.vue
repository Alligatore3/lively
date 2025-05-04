<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

const propertyImages = computed<string[]>(() => property.images.filter(isString));
</script>

<template>
  <section id="property-images" class="relative">
    <UButton
      class="hidden lg:flex absolute top-4 left-4 rounded-md px-5 py-3 font-semibold z-10"
      icon="i-heroicons-arrow-left-20-solid"
      :label="$t('properties.back')"
      :trailing="false"
      color="white"
      variant="solid"
      size="sm"
      @click="$router.back()"
    />

    <UCarousel
      v-slot="{ item }"
      class="overflow-hidden max-h-80"
      :ui="{ item: 'basis-2/6' }"
      :items="propertyImages"
      arrows
    >
      <img :src="item" class="w-full" draggable="false" />
    </UCarousel>

    <div class="p-2 block lg:hidden">
      <UButton
        class="rounded-md font-semibold w-full"
        icon="i-heroicons-arrow-left-20-solid"
        :label="$t('properties.back')"
        :trailing="false"
        color="white"
        variant="solid"
        size="sm"
        @click="$router.back()"
      />
    </div>
  </section>
</template>
