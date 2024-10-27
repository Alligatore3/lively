<script setup lang="ts">
import { useShare } from '@vueuse/core';
import { generateSocialMetaAttributes } from '@/utils/generateSocialMetaAttributes';
import type { Property } from '@/types/Property';
import CheckIcon from '@/components/icons/CheckIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';

type Props = {
  property: Property;
};

type PropertyAttributeKey = 'air_conditioning' | 'kitchen' | 'parking' | 'wifi';

const { t } = useI18n();

const { property } = defineProps<Props>();

const { share, isSupported } = useShare();

const isTruncated = ref(true);

const sharePropertyAttributes = computed(() => ({
  title: `Lively - ${property.title}`,
  url: location.href,
}));

useHead({
  meta: generateSocialMetaAttributes({
    title: `Lively - ${property.title}`,
    description: property.description,
    src: property.image,
    url: location.href,
    width: 180,
    height: 110,
  }),
});

const propertyAddressLink = computed<Property['address'] | null>(() => {
  const prefix = 'https://www.google.com/maps/search/?api=1&query=';
  return property.address ? `${prefix}${property.address}` : null;
});

const propertyAttibuteList: Array<{
  key: PropertyAttributeKey;
  label: string;
}> = [
  { key: 'air_conditioning', label: t('properties.attributes.airConditioning') },
  { key: 'kitchen', label: t('properties.attributes.kitchen') },
  { key: 'parking', label: t('properties.attributes.parking') },
  { key: 'wifi', label: t('properties.attributes.wifi') },
];

const propertyAttributeListAvailableMap = computed(() =>
  propertyAttibuteList.filter(({ key }) => Boolean(property[key]))
);
</script>

<template>
  <section id="property-data" class="px-8">
    <div class="flex mb-12 items-center">
      <div class="flex gap-2">
        <LocationIcon class="text-black" />

        <NuxtLink
          v-if="propertyAddressLink"
          :to="propertyAddressLink"
          class="font-semibold underline"
          target="_blank"
          rel="noopener"
        >
          {{ property.address }}
        </NuxtLink>
      </div>

      <div class="flex-grow" />

      <button
        v-if="isSupported"
        @click="share(sharePropertyAttributes)"
        class="flex flex-row gap-2 border rounded-md px-5 py-3 font-semibold"
      >
        <DownloadIcon class="text-black" />
        {{ $t('properties.share') }}
      </button>
    </div>

    <div class="flex gap-2">
      <div class="flex w-1/2 flex-col gap-3">
        <h3 class="text-7xl">¥{{ property.price }}</h3>

        <h1 class="text-2xl my-2">{{ property.title }}</h1>

        <NuxtLink class="underline font-bold">
          {{ t('properties.pricingDetailsTerms') }}
        </NuxtLink>

        <ul class="mt-12 flex font-bold gap-12 items-center">
          <li>
            {{ $t('properties.mqCounter', { counter: property.area }) }}
          </li>
          <li>
            {{ $t('properties.roomCounter', { counter: property.n_rooms }) }}
          </li>
          <li>
            {{ $t('properties.bathCounter', { counter: property.n_bathrooms }) }}
          </li>
        </ul>

        <div class="flex gap-2 mt-24">
          <div class="w-1/2"></div>
          <button class="w-1/2 bg-black text-white rounded-md px-5 py-3 font-semibold">
            {{ t('properties.sendRequest') }}
          </button>
        </div>
      </div>
      <div class="flex w-1/2 flex-col gap-3 items-start">
        <p class="font-bold text-xl">{{ t('properties.aboutApartment') }}</p>
        <p v-html="property.description" :class="isTruncated ? 'line-clamp-2' : undefined" />

        <button class="underline font-semibold" @click="isTruncated = !isTruncated">
          {{ isTruncated ? t('properties.readMore') : t('properties.readLess') }}
        </button>

        <ul class="flex flex-row gap-5 mt-9 flex-wrap">
          <li
            class="flex flex-row items-center gap-1 font-bold"
            :key="attribute.key"
            v-for="attribute in propertyAttributeListAvailableMap"
          >
            <CheckIcon />
            {{ attribute.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
