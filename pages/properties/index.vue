<script setup lang="ts">
import { createPropertyMock } from '@/utils/createPropertyMock';
import BurgerIcon from '@/components/icons/BurgerIcon';
import GridIcon from '@/components/icons/GridIcon';

const properties = [
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
];

const gridLayout = ref<'grid' | 'list'>('grid');

const gridClasses = computed(() =>
  gridLayout.value === 'grid' ? 'grid grid-rows-3 grid-flow-col gap-3' : 'flex gap-4 flex-col w-full'
);

function toggleLayout() {
  gridLayout.value = gridLayout.value === 'grid' ? 'list' : 'grid';
}
</script>

<template>
  <ContentWithFilters>
    <div>
      <ul class="flex flex-column gap-4">
        <li>
          <button @click="toggleLayout">
            <GridIcon />
          </button>
          <span class="sr-only">Grid layout toggle</span>
        </li>
        <li>
          <button @click="toggleLayout">
            <BurgerIcon />
          </button>
          <span class="sr-only">List layout toggle</span>
        </li>
      </ul>
    </div>
    <div :class="['my-4 transition-all duration-300 ease-in-out', gridClasses]">
      <NuxtLink
        :to="{ name: 'properties-id', params: { id: property.id } }"
        v-for="property in properties"
        :key="property.id"
      >
        <PropertyCard :property="property" />
      </NuxtLink>
    </div>
  </ContentWithFilters>
</template>
