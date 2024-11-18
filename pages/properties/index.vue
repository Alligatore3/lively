<script setup lang="ts">
import { generatePropertyQueryType } from '@/utils/generatePropertyQueryType';
import ContentGridListSwitcher from '@/components/ContentGridListSwitcher';
import PropertyTypeToggle from '@/components/PropertyTypeToggle';
import type { GetPropertyListParameters } from '@/types/GetPropertyListParameters';
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import EntityRanges from '@/components/EntityRanges';
import { ROUTES } from '@/constants';

const route = useRoute();

const { getPropertyList, propertyList, isLoading } = useLivelyStore();

const queryPropertyType = computed(() => generatePropertyQueryType(route));

async function onFilterChange(params: GetPropertyListParameters) {
  const query = { ...route.query, ...params };

  await navigateTo({
    path: ROUTES.PROPERTIES,
    query,
  });
}

const fetchPropertyListByType = async () => {
  await onFilterChange({ type: queryPropertyType.value });

  if (isLoading.value) return;

  const params = route.query as unknown as GetPropertyListParameters;
  getPropertyList(params);
};

const onFiltersReset = async () => {
  const type = queryPropertyType.value;
  await onFilterChange({ type });

  if (isLoading.value) return;

  getPropertyList({ type });
};

onMounted(() => {
  fetchPropertyListByType();
});
</script>

<template>
  <ContentWithSidebar>
    <template #sidebar>
      <div class="flex flex-col gap-12 px-2">
        <PropertyTypeToggle
          :onToggleChange="
            (type: PropertyType) => {
              onFilterChange({ type });
            }
          "
        />

        <EntityRanges
          :onRangeChange="
            (values: number[]) => {
              const [price_low, price_high] = values;
              onFilterChange({ type: queryPropertyType, price_low, price_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.price') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges
          :onRangeChange="
            (values: number[]) => {
              const [area_low, area_high] = values;
              onFilterChange({ type: queryPropertyType, area_low, area_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.squareMeters') }}
            </h3>
          </template>
        </EntityRanges>

        <EntityRanges
          :onRangeChange="
            (values: number[]) => {
              const [rooms_low, rooms_high] = values;
              onFilterChange({ type: queryPropertyType, rooms_low, rooms_high });
            }
          "
        >
          <template #label>
            <h3 class="text-lg font-bold">
              {{ $t('filters.rooms') }}
            </h3>
          </template>
        </EntityRanges>

        <div class="flex flex-col lg:flex-row gap-2">
          <button
            class="w-full lg:w-1/2 border py-2 font-semibold rounded"
            @click="onFiltersReset"
            :disabled="isLoading"
          >
            {{ $t('shared.reset') }}
          </button>

          <button
            class="w-full lg:w-1/2 bg-black text-white font-semibold py-2 rounded flex align-center justify-center"
            @click="fetchPropertyListByType"
            :disabled="isLoading"
          >
            <Spinner v-if="isLoading" classes="w-[24px] after:w-[24px] h-[24px] after:h-[24px] after:border" />
            <span v-else>
              {{ $t('shared.submit') }}
            </span>
          </button>
        </div>
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
