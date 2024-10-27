<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';

const route = useRoute();

const { getPropertyBySlug, propertyBySlug, isLoading } = useLivelyStore();

const properyURLSlug = computed<string | null>(() => {
  const slug = route.params.slug;
  return isString(slug) ? slug : null;
});

onMounted(async () => {
  await getPropertyBySlug(properyURLSlug.value);
});
</script>

<template>
  <PropertyPageSkeleton v-if="isLoading" />
  <div v-else-if="propertyBySlug">
    <PropertySectionImages :property="propertyBySlug" />

    <PropertySectionDetails :property="propertyBySlug" />
  </div>
</template>
