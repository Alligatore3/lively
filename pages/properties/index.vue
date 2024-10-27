<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import type { Property } from '@/types/Property';

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

const fakeProperties = computed<Property[]>(() => {
  if (!propertyList.value.length) return [];

  const fakeValues = Array.from({ length: 8 }, () => propertyList.value[0]);
  return [...fakeValues, ...propertyList.value];
});

async function fetchPropertiesByType() {
  if (isLoading.value) return;
  await getPropertyList('rent');
}

onMounted(fetchPropertiesByType);
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar> FILTER </template>

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else>
        <template #loop-list>
          <li v-for="property in fakeProperties" :key="property.id">
            <NuxtLink :to="{ name: 'properties-slug', params: { slug: property.slug } }">
              <PropertyCard :property="property" />
            </NuxtLink>
          </li>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
