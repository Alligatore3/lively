<script setup lang="ts">
import PropertiesSearchForm from '@/components/PropertiesSearchForm';
import type { PropertyType } from '@/types/PropertyType';
import { useLivelyStore } from '@/stores/useLivelyStore';
import { DEFAULT_PROPERTY_TYPE } from '@/constants';
import houseImage from '~/assets/images/house.png';

const backgroundImage = `url(${houseImage})`;

const { getLocationList } = useLivelyStore();

const propertyType = ref<PropertyType>(DEFAULT_PROPERTY_TYPE);

const propertyLocation = ref<string | null>(null);

const propertyPriceRange = ref<number | null>(null);

function onSubmit() {
  navigateTo({
    path: '/properties',
    query: {
      priceRange: propertyPriceRange.value,
      location: propertyLocation.value,
      type: propertyType.value,
    },
  });
}

console.log(12, propertyPriceRange.value);

// onMounted(() => getLocationList(propertyTypeModel.value));
</script>

<template>
  <div class="w-full h-full">
    <div :style="{ backgroundImage }" class="h-full bg-right-bottom bg-no-repeat">
      <div class="flex flex-col gap-4 max-w-4xl p-16">
        <h3 class="font-bold text-8xl" v-html="$t('home.title')" />

        <p class="my-4 text-2xl">
          {{ $t('home.description') }}
        </p>

        <div class="flex-1"></div>

        <PropertiesSearchForm
          v-model:property-price-range="propertyPriceRange"
          v-model:property-location="propertyLocation"
          v-model:property-type="propertyType"
          :onSubmit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>
