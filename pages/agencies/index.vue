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
    <template #sidebar />

    <template #content>
      <GridCardsSkeleton v-if="isLoading" />

      <ContentGridListSwitcher v-else :list-lenght="agencyList.length">
        <template v-if="agencyList.length > 0" #loop-list>
          <template v-if="agencyList.length > 0">
            <li v-for="agency in agencyList" :key="agency.id">
              <NuxtLink :to="{ name: 'agencies-slug', params: { slug: agency.slug } }">
                <AgencyCard :agency="agency" />
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <NoResultsItemList />
          </template>
        </template>
      </ContentGridListSwitcher>
    </template>
  </ContentWithSidebar>
</template>
