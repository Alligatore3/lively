<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';
import BurgerIcon from '@/components/icons/BurgerIcon';
import GridIcon from '@/components/icons/GridIcon';
import type { Property } from '@/types/Property';

const gridLayout = ref<'grid' | 'list'>('grid');

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

const isGridLayout = computed<boolean>(() => gridLayout.value === 'grid');

const fakeProperties = computed<Property[]>(() => {
  if (!propertyList.value.length) return [];

  const fakeValues = Array.from({ length: 8 }, () => propertyList.value[0]);
  return [...fakeValues, ...propertyList.value];
});

const gridClasses = computed<string[]>(() => {
  const deafultClasses = ['my-4 transition-all duration-300 ease-in-out'];

  return isGridLayout.value
    ? [...deafultClasses, 'grid grid-rows-3 grid-flow-col gap-3']
    : [...deafultClasses, 'flex gap-4 flex-col w-full'];
});

function toggleLayout() {
  gridLayout.value = isGridLayout.value ? 'list' : 'grid';
}

async function fetchPropertiesByType() {
  if (isLoading.value) return;
  await getPropertyList('rent');
}

onMounted(fetchPropertiesByType);
</script>

<template>
  <ContentWithFilters>
    <PropertyCardsSkeleton v-if="isLoading" />

    <div v-else>
      <div>
        <ul class="flex flex-column gap-4">
          <li :class="isGridLayout ? 'text-black' : 'text-gray'">
            <button @click="toggleLayout">
              <GridIcon />
            </button>
            <span class="sr-only">Grid layout toggle</span>
          </li>
          <li :class="!isGridLayout ? 'text-black' : 'text-gray'">
            <button @click="toggleLayout">
              <BurgerIcon />
            </button>
            <span class="sr-only">List layout toggle</span>
          </li>
        </ul>
      </div>
      <div :class="gridClasses">
        <NuxtLink
          v-for="property in fakeProperties"
          :to="{ name: 'properties-slug', params: { slug: property.slug } }"
          :key="property.id"
        >
          <PropertyCard :property="property" />
        </NuxtLink>
      </div>
    </div>
  </ContentWithFilters>
</template>
