<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();

const propertyImage = computed<string>(() => {
  const url = property.image || property.image_2 || property.image_3 || property.image_4;
  return `url('${url}')`;
});
</script>

<template>
  <div
    class="rounded-2xl h-[284px] w-full bg-cover bg-no-repeat bg-center overflow-hidden"
    :style="{
      'background-image': propertyImage,
    }"
  >
    <div class="w-full h-full flex flex-col">
      <div class="flex-grow"></div>
      <div class="flex-grow flex flex-col justify-end p-4 bg-gradient-to-t from-black">
        <p class="font-bold text-xl text-white">${{ Number(property.price).toFixed(2) }}</p>
        <p class="font-semibold text-white">{{ property.address }}</p>
        <p class="font-light text-sm text-white">
          {{
            $t('properties.cardFooter', {
              bedroom: property.bedroom,
              rooms: property.rooms,
              mq: property.mq,
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>
