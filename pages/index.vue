<!-- eslint-disable vue/no-v-html -->
<script setup lang="ts">
import PropertiesSearchForm from '@/components/PropertiesSearchForm';
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import { DEFAULT_PROPERTY_TYPE, ROUTES } from '@/constants';
import houseImage from '~/assets/images/house.png';

const backgroundImage = `url(${houseImage})`;

const { getLocationList, propertyLocationList, isLoading } = useLivelyStore();

const propertyType = ref<PropertyType>(DEFAULT_PROPERTY_TYPE);

const propertyLocation = ref<number | null>(null);

const propertyPriceRange = ref<number | null>(null);

function onSubmit() {
  navigateTo({
    path: ROUTES.PROPERTIES,
    query: {
      priceRange: propertyPriceRange.value || undefined,
      location: propertyLocation.value || undefined,
      type: propertyType.value,
    },
  });
}

async function fetchLocationsByType() {
  if (!propertyType.value) return;

  await getLocationList(propertyType.value);
}

watch(propertyType, fetchLocationsByType);

onMounted(fetchLocationsByType);
</script>

<template>
  <div class="w-full h-full">
    <div :style="{ backgroundImage }" class="h-full bg-right-bottom bg-no-repeat pb-[80rem] md:pb-[60rem] lg:pb-0">
      <div class="lg:max-w-4xl p-16">
        <h2 class="font-bold text-4xl md:text-6xl lg:text-8xl" v-html="$t('home.title')" />

        <p class="mt-4 text-base md:text-xl lg:text-2xl">
          {{ $t('home.description') }}
        </p>

        <PropertiesSearchForm
          v-model:property-price-range="propertyPriceRange"
          v-model:property-location="propertyLocation"
          v-model:property-type="propertyType"
          class="mt-16"
          :locations="propertyLocationList"
          :is-loading="isLoading"
          :on-submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>
