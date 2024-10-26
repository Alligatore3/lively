<script setup lang="ts">
import type { Property } from '@/types/Property';

type Props = {
  property: Property;
};

const { property } = defineProps<Props>();
</script>

<template>
  <section id="property-data" class="px-4 pt-6">
    <div class="flex gap-2">
      <div class="flex flex-grow flex-col gap-3">
        <h3 class="text-4xl">¥{{ property.price }}</h3>
        <h1 class="text-2xl">{{ property.title }}</h1>
      </div>
      <div class="flex flex-grow flex-col gap-3">
        <h3 class="text-4xl">¥{{ property.price }}</h3>
        <h1 class="text-2xl">{{ property.title }}</h1>
      </div>
    </div>
  </section>
</template>
