<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

const propertyImage = computed<string>(() => `url('${property.images[0]}')`);
</script>

<template>
  <div
    class="relative rounded-2xl h-[284px] w-full bg-cover bg-no-repeat bg-center overflow-hidden"
    :style="{
      'background-image': propertyImage,
    }"
  >
    <slot name="avatar" />
    <div class="w-full h-full flex flex-col">
      <div class="flex-grow"></div>
      <div class="flex-grow flex flex-col justify-end p-4 bg-gradient-to-t from-black">
        <p class="font-bold text-xl text-white">¥{{ property.price }}</p>
        <p class="font-semibold text-white">{{ property.title }}</p>
        <p class="font-light text-sm text-white">
          {{
            $t('properties.cardFooter', {
              bathrooms: property.n_bathrooms,
              rooms: property.n_rooms,
              mq: property.area,
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>
