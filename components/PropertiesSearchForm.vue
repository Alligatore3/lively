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
    <div class="rounded-[30px] border border-gray w-auto md:w-[666px] bg-white py-4 md:py-1">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
        <div class="flex flex-1 flex-row md:flex-col px-4 w-full justify-between">
          <label for="type" class="font-semibold">
            {{ $t('home.form.type.label') }}
          </label>
          <select v-model="propertyType" name="type" id="type" :form="formId" :disabled="isLoading.value">
            <option value="buy">
              {{ $t('home.form.type.values.buy') }}
            </option>
            <option value="rent">
              {{ $t('home.form.type.values.rent') }}
            </option>
          </select>
        </div>

        <div class="divider"></div>

        <div class="flex flex-1 flex-row md:flex-col px-4 w-full justify-between">
          <label for="location" class="font-semibold">
            {{ $t('home.form.location.label') }}
          </label>
          <select v-model="propertyLocation" name="location" id="location" :form="formId" :disabled="isLoading.value">
            <option :value="null" disabled selected hidden>{{ $t('home.form.location.placeholder') }}</option>
            <option :key="location.id" v-for="location in locations" :value="location.id">
              {{ location.name }}
            </option>
          </select>
        </div>

        <div class="divider"></div>

        <div class="flex flex-1 flex-row md:flex-col px-4 w-full justify-between">
          <label for="priceRange" class="font-semibold">
            {{ $t('home.form.priceRange.label') }}
          </label>
          <input
            :placeholder="$t('home.form.priceRange.placeholder')"
            v-model="propertyPriceRange"
            :disabled="isLoading.value"
            name="priceRange"
            id="priceRange"
            :form="formId"
            type="number"
          />
        </div>

        <div id="desktop-submit" class="hidden md:flex">
          <div v-if="isLoading" class="rounded-full bg-black w-12 h-12">
            <Spinner classes="w-[32px] after:w-[32px] h-[32px] after:h-[32px] after:m-[8px] after:border-2" />
          </div>
          <button v-else type="submit" class="rounded-full bg-black w-12 h-12 text-white">
            <LensIcon class="mx-auto" />
          </button>
        </div>
      </div>
    </div>

    <div id="mobile-submit" class="block mt-4 w-full md:hidden">
      <div v-if="isLoading" class="rounded-full flex justify-center bg-black py-3">
        <Spinner classes="w-[16px] after:w-[16px] h-[16px] after:h-[16px] after:border" />
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

<style scoped>
.divider {
  @apply h-px md:h-[32px] w-full md:w-px bg-gray-200 md:block;
}
</style>
