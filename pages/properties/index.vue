<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

async function fetchPropertiesByType() {
  if (isLoading.value) return;
  await getPropertyList('rent');
}

onMounted(fetchPropertiesByType);
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar> </template>

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else :listLenght="propertyList.length">
        <template #loop-list>
          <li v-for="property in propertyList" :key="property.id">
            <NuxtLink :to="{ name: 'properties-slug', params: { slug: property.slug } }">
              <PropertyCard :property="property" />
            </NuxtLink>
          </li>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
