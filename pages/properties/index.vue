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
    ? [...deafultClasses, 'grid grid-flow-col grid-rows-12 md:grid-rows-6 xl:grid-rows-3 gap-4']
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
          <li class="leading-[0]" :class="isGridLayout ? 'text-black' : 'text-gray'">
            <button class="leading-[0]" @click="toggleLayout">
              <GridIcon />
            </button>
            <span class="sr-only">Grid layout toggle</span>
          </li>
          <li class="leading-[0]" :class="!isGridLayout ? 'text-black' : 'text-gray'">
            <button class="leading-[0]" @click="toggleLayout">
              <BurgerIcon />
            </button>
            <span class="sr-only">List layout toggle</span>
          </li>
        </ul>
      </div>
      <ul :class="gridClasses">
        <li v-for="property in fakeProperties" :key="property.id">
          <NuxtLink :to="{ name: 'properties-slug', params: { slug: property.slug } }">
            <PropertyCard :property="property" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ContentWithFilters>
</template>
