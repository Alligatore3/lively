<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';
import type { Property } from '@/types/Property';

const route = useRoute();

const { getPropertyList, propertyList, getPropertyBySlug, propertyBySlug, isLoading } = useLivelyStore();

const properyURLSlug = computed<string | null>(() => {
  const slug = route.params.slug;
  return isString(slug) ? slug : null;
});

const property = computed<Property | null>(() => propertyList.value?.[0] || null); // to be removed

onMounted(async () => {
  await getPropertyBySlug(properyURLSlug.value);
  await getPropertyList('rent'); // to be removed
});
</script>

<template>
  <PropertyPageSkeleton />

  <!-- <div v-if="isLoading">isLoading</div>
  <div v-else-if="property">
    <PropertySectionImages :property="property" />

    <PropertySectionDetails :property="property" />
  </div> -->
</template>
