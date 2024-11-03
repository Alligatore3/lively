<script setup lang="ts">
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import { ROUTES } from '@/constants';
import PropertyTypeToggle from '@/components/PropertyTypeToggle';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import { generatePropertyQueryType } from '@/utils/generatePropertyQueryType';

const route = useRoute();

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

const fetchPropertyListByType = async (type: PropertyType) => {
  const query = { ...route.query, type };

  await navigateTo({
    path: ROUTES.PROPERTIES,
    query,
  });

  if (isLoading.value) return;
  getPropertyList(query);
};

onMounted(() => {
  const type = generatePropertyQueryType(route);
  fetchPropertyListByType(type);
});
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar>
      <PropertyTypeToggle
        :onPropertyTypeToggleChange="
          (type: PropertyType) => {
            fetchPropertyListByType(type);
          }
        "
      />
    </template>

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
