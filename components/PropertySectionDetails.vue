<script setup lang="ts">
import type { Property } from '@/types/Property';
import CheckIcon from '@/components/icons/CheckIcon';

type Props = {
  property: Property;
};

type PropertyAttributeKey = 'air_conditioning' | 'kitchen' | 'parking' | 'wifi';

const { t } = useI18n();

const { property } = defineProps<Props>();

const isTruncated = ref(true);

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
  <section id="property-data" class="px-4 pt-6">
    <div class="flex gap-2">
      <div class="flex w-1/2 flex-col gap-3">
        <h3 class="text-4xl">¥{{ property.price }}</h3>
        <h1 class="text-2xl">{{ property.title }}</h1>
      </div>
      <div class="flex w-1/2 flex-col gap-3 items-start">
        <p class="font-bold text-xl">{{ t('properties.aboutApartment') }}</p>
        <p v-html="property.description" :class="isTruncated ? 'line-clamp-2' : undefined" />

        <button class="underline font-semibold" @click="isTruncated = !isTruncated">
          {{ isTruncated ? t('properties.readMore') : t('properties.readLess') }}
        </button>

        <ul class="flex flex-row gap-5 mt-9">
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
