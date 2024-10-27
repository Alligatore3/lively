<script setup lang="ts">
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import { useLivelyStore } from '@/stores/useLivelyStore';

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

async function fetchPropertiesByType() {
  if (isLoading.value) return;
  await getPropertyList('rent');
}

onMounted(fetchPropertiesByType);
</script>

<template>
  <ContentWithFilters>
    <PropertyCardsSkeleton v-if="isLoading" />

    <ContentGridListSwitcher v-else>
      <template #loop-list> HEY </template>
    </ContentGridListSwitcher>
  </ContentWithFilters>
</template>
