<script setup lang="ts">
import type { PropertyType } from '@/types/PropertyType';

type Props = {
  onPropertyTypeToggleChange: (type: PropertyType) => void;
};

const route = useRoute();

const { onPropertyTypeToggleChange } = defineProps<Props>();

const activeClasses = 'active bg-black text-white';

const isBuySelected = computed(() => route.query.type === 'buy');

const isRentSelected = computed(() => route.query.type === 'rent');
</script>

<template>
  <div class="flex flex-wrap justify-center flex-row md:flex-col lg:flex-row border rounded-lg mx-auto w-fit p-2">
    <div class="hidden">
      <input type="checkbox" id="propertyType" name="propertyType" v-model="isBuySelected" />
      <label for="propertyType">Property type</label>
    </div>

    <button
      :class="isBuySelected ? activeClasses : ''"
      @click="onPropertyTypeToggleChange('buy')"
      class="px-12 py-1 font-semibold rounded"
    >
      {{ $t('properties.aside.buy') }}
    </button>
    <button
      :class="isRentSelected ? activeClasses : ''"
      @click="onPropertyTypeToggleChange('rent')"
      class="px-12 py-1 font-semibold rounded"
    >
      {{ $t('properties.aside.rent') }}
    </button>
  </div>
</template>
