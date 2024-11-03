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
  await navigateTo({
    path: ROUTES.PROPERTIES,
    query: { type },
  });

  if (isLoading.value) return;
  getPropertyList(type);
};

function onPropertyTypeToggleChange(type: PropertyType) {
  fetchPropertyListByType(type);
}

onMounted(() => {
  const type = generatePropertyQueryType(route);
  fetchPropertyListByType(type);
});
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar>
      <PropertyTypeToggle :onPropertyTypeToggleChange="onPropertyTypeToggleChange" />
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
