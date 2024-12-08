<script setup lang="ts">
import { useShare } from '@vueuse/core';
import type { Property } from '@/types/Property';
import CheckIcon from '@/components/icons/CheckIcon';
import LocationIcon from '@/components/icons/LocationIcon';
import DownloadIcon from '@/components/icons/DownloadIcon';
import ReadMoreWrapper from '@/components/ReadMoreWrapper';
import PropertyRequestDialog from '@/components/PropertyRequestDialog';
import { generateSocialMetaAttributes } from '@/utils/generateSocialMetaAttributes';

type Props = {
  property: Property;
};

type PropertyAttributeKey = 'air_conditioning' | 'kitchen' | 'parking' | 'wifi';

const { t } = useI18n();

const { property } = defineProps<Props>();

const { share, isSupported } = useShare();

const modal = useModal();

const sharePropertyAttributes = computed(() => ({
  title: `Lively - ${property.title}`,
  url: location.href,
}));

useHead({
  meta: generateSocialMetaAttributes({
    title: `Lively - ${property.title}`,
    description: property.description,
    src: property.images[0],
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

function openModal() {
  /**
   * Control programmatically
   * @see https://ui.nuxt.com/components/modal#control-programmatically
   */
  modal.open(PropertyRequestDialog);
}
</script>

<template>
  <section id="property-data" class="px-8 mt-8">
    <div class="flex flex-col md:flex-row mb-6 md:mb-12 items-center gap-2">
      <div class="flex gap-2">
        <LocationIcon class="text-black shrink-0" />

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
        class="flex w-full md:w-auto flex-row gap-2 border rounded-md px-5 py-3 font-semibold justify-center"
        @click="share(sharePropertyAttributes)"
      >
        <DownloadIcon class="text-black" />
        {{ $t('properties.share') }}
      </button>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex md:w-1/2 flex-col gap-3">
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

        <div class="flex flex-col lg:flex-row gap-2 my-12 lg:my-24">
          <NuxtLink
            :to="{ name: 'agencies-slug', params: { slug: property.agency_slug } }"
            class="w-full lg:w-1/2 border rounded-md px-5 py-3 font-semibold"
          >
            <div class="flex flex-row gap-4 items-center">
              <NuxtImg
                class="border rounded-full w-8 h-8"
                :src="property.agency_image"
                :alt="property.agency_name"
                object-fit="cover"
                layout="fill"
              />
              <p class="font-bold truncate">
                {{ t('properties.agent', { agent: property.agency_name }) }}
              </p>
            </div>
          </NuxtLink>

          <button class="w-full lg:w-1/2 bg-black text-white rounded-md px-5 py-3 font-semibold" @click="openModal">
            {{ t('properties.sendRequest') }}
          </button>
        </div>
      </div>

      <div class="flex md:w-1/2 flex-col gap-3">
        <ReadMoreWrapper :description="property.description">
          <template #label>
            <p class="font-bold text-xl">{{ t('properties.aboutApartment') }}</p>
          </template>
        </ReadMoreWrapper>

        <ul class="flex flex-row gap-5 mt-9 flex-wrap">
          <li
            v-for="attribute in propertyAttributeListAvailableMap"
            :key="attribute.key"
            class="flex flex-row items-center gap-1 font-bold"
          >
            <CheckIcon />
            {{ attribute.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
