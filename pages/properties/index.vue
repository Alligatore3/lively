<script setup lang="ts">
import { generatePropertyQueryType } from '@/utils/generatePropertyQueryType';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import PropertyTypeToggle from '@/components/PropertyTypeToggle';
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import EntityRanges from '@/components/EntityRanges';
import { ROUTES } from '@/constants';

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
      <div class="flex flex-col gap-12">
        <PropertyTypeToggle
          :onPropertyTypeToggleChange="
            (type: PropertyType) => {
              fetchPropertyListByType(type);
            }
          "
        />

        <EntityRanges>
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.price') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges>
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.squareMeters') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges>
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.rooms') }}
            </h3>
          </template>
        </EntityRanges>
      </div>
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
