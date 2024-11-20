<script setup lang="ts">
import type { PropertyType } from '@/types/PropertyType';

type Props = {
  onToggleChange: (type: PropertyType) => void;
};

const route = useRoute();

const { onToggleChange } = defineProps<Props>();

const activeClasses = 'active bg-black text-white';

const isBuySelected = computed(() => route.query.type === 'buy');

const isRentSelected = computed(() => route.query.type === 'rent');
</script>

<template>
  <div class="flex flex-wrap flex-row justify-center md:flex-col lg:flex-row border rounded-lg mx-auto w-full py-2">
    <div class="hidden">
      <input type="checkbox" id="propertyType" name="propertyType" v-model="isBuySelected" />
      <label for="propertyType">Property type</label>
    </div>

    <button
      :class="isBuySelected ? activeClasses : ''"
      class="px-12 py-1 font-semibold rounded"
      @click="onToggleChange('buy')"
    >
      {{ $t('properties.aside.buy') }}
    </button>
    <button
      :class="isRentSelected ? activeClasses : ''"
      class="px-12 py-1 font-semibold rounded"
      @click="onToggleChange('rent')"
    >
      {{ $t('properties.aside.rent') }}
    </button>
  </div>
</template>
