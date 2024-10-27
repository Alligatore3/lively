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
    <template #sidebar>
      <div v-if="isLoading" role="status" class="flex gap-6 flex-col animate-pulse md:px-6 dark:border-gray-400">
        <div class="h-16 w-16 bg-gray-200 rounded-full dark:bg-gray-400"></div>
        <div class="h-2 w-2/3 bg-gray-200 rounded-full dark:bg-gray-400"></div>
        <div class="h-2 w-1/2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
      </div>

      <AgencyInfo v-else-if="agencyBySlug" :agency="agencyBySlug" />
    </template>

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
