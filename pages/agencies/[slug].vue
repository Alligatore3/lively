<script setup lang="ts">
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import { useLivelyStore } from '@/stores/useLivelyStore';
import type { Agency } from '@/types/Agency';

const route = useRoute();

const { getAgencyBySlug, agencyBySlug, isLoading } = useLivelyStore();

const agencySlug = computed<Agency['slug'] | null>(() => (isString(route.params.slug) ? route.params.slug : null));

async function fetchAgencyPropertyListBySlug() {
  if (isLoading.value) return;
  await getAgencyBySlug(agencySlug.value);
}

onMounted(fetchAgencyPropertyListBySlug);
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar> FILTER </template>

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else>
        <template #loop-list>
          {{ agencyBySlug }}
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
