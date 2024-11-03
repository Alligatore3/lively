<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';

const { getAgencyList, agencyList, isLoading } = useLivelyStore();

onMounted(() => {
  if (isLoading.value) return;
  getAgencyList();
});
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar></template>

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else :listLenght="agencyList.length">
        <template #loop-list>
          <li v-for="agency in agencyList" :key="agency.id">
            <NuxtLink :to="{ name: 'agencies-slug', params: { slug: agency.slug } }">
              <AgencyCard :agency="agency" />
            </NuxtLink>
          </li>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
