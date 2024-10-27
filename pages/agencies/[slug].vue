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

      <ContentGridListSwitcher v-else-if="agencyBySlug">
        <template #loop-list>
          <li v-for="property in agencyBySlug.properties" :key="property.id">
            <NuxtLink :to="{ name: 'properties-slug', params: { slug: property.slug } }">
              <PropertyCard :property="property">
                <template #avatar>
                  <NuxtImg
                    class="w-9 h-9 rounded-full border absolute right-3 top-3"
                    :src="agencyBySlug.image"
                    :alt="agencyBySlug.name"
                  />
                </template>
              </PropertyCard>
            </NuxtLink>
          </li>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
