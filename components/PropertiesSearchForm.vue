<script setup lang="ts">
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import LensIcon from '@/components/icons/LensIcon';

type Props = {
  locations?: PropertyLocation[];
  isLoading: Ref<boolean>;
  onSubmit: () => void;
};

defineProps<Props>();

const propertyType = defineModel<PropertyType>('propertyType');

const propertyLocation = defineModel<number | null>('propertyLocation');

const propertyPriceRange = defineModel<number | null>('propertyPriceRange');

const formId = 'home-search-form';
</script>

<template>
  <form :id="formId" @submit.prevent="onSubmit">
    <div class="relative rounded-[30px] border border-gray w-auto md:w-[550px] bg-white md:px-1 py-4 md:py-1">
      <div class="flex">
        <div class="w-full flex flex-1 flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex flex-1 flex-row md:flex-col w-full px-4 md:px-0 justify-between md:ml-4">
            <label for="type" class="font-semibold">
              {{ $t('home.form.type.label') }}
            </label>
            <select
              id="type"
              v-model="propertyType"
              :disabled="isLoading.value"
              class="dark:bg-white"
              :form="formId"
              name="type"
            >
              <option value="buy">
                {{ $t('home.form.type.values.buy') }}
              </option>
              <option value="rent">
                {{ $t('home.form.type.values.rent') }}
              </option>
            </select>
          </div>

          <UDivider class="w-px h-full py-2" orientation="vertical" />

          <div class="flex flex-1 flex-col gap-3 md:gap-0 w-full px-4 md:px-0 justify-between">
            <label for="location" class="font-semibold">
              {{ $t('home.form.location.label') }}
            </label>
            <select
              id="location"
              v-model="propertyLocation"
              :disabled="isLoading.value || locations?.length === 0"
              class="dark:bg-white"
              name="location"
              :form="formId"
            >
              <option :value="null" disabled selected hidden>{{ $t('home.form.location.placeholder') }}</option>
              <option v-for="location in locations" :key="location.id" :value="location.id">
                {{ location.name }}
              </option>
            </select>
          </div>

          <UDivider class="w-px h-full py-2" orientation="vertical" />

          <div class="flex flex-1 flex-col gap-3 md:gap-0 w-full px-4 md:px-0 justify-between">
            <label for="priceRange" class="font-semibold">
              {{ $t('home.form.priceRange.label') }}
            </label>
            <input
              id="priceRange"
              v-model="propertyPriceRange"
              :placeholder="$t('home.form.priceRange.placeholder')"
              :disabled="isLoading.value"
              class="dark:bg-white"
              name="priceRange"
              :form="formId"
              type="number"
            />
          </div>
        </div>

        <div id="desktop-submit" class="hidden md:flex shrink-0">
          <div v-if="isLoading" class="rounded-full bg-black w-12 h-12">
            <SpinnerLoader classes="w-[32px] after:w-[32px] h-[32px] after:h-[32px] after:m-[8px] after:border-2" />
          </div>
          <button v-else type="submit" class="rounded-full bg-black w-12 h-12 text-white">
            <LensIcon class="mx-auto" />
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-submit" class="block mt-4 w-full md:hidden">
      <div v-if="isLoading" class="rounded-full flex justify-center bg-black py-3">
        <SpinnerLoader classes="w-[16px] after:w-[16px] h-[16px] after:h-[16px] after:border" />
      </div>
      <button
        v-else
        type="submit"
        class="rounded-full flex gap-2 justify-center align-center w-full bg-black text-white py-3"
      >
        <span>{{ $t('home.form.submit') }}</span>
        <LensIcon />
      </button>
    </div>
  </form>
</template>
