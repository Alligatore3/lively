<script setup lang="ts">
import type { PropertyLocation } from '@/types/PropertyLocation';
import type { PropertyType } from '@/types/PropertyType';
import LensIcon from '@/components/icons/LensIcon';

type Props = {
  locations?: PropertyLocation[];
  onSubmit: () => void;
  isLoading: boolean;
};

defineProps<Props>();

const propertyType = defineModel<PropertyType>('propertyType');

const propertyLocation = defineModel<number | null>('propertyLocation');

const propertyPriceRange = defineModel<number | null>('propertyPriceRange');

const formId = 'home-search-form';
</script>

<template>
  <form :id="formId" @submit.prevent="onSubmit" class="rounded-[30px] border border-gray w-[666px] bg-white p-1">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-1 flex-col px-4">
        <label for="type" class="font-semibold">
          {{ $t('home.form.type.label') }}
        </label>
        <select v-model="propertyType" name="type" id="type" :form="formId" :disabled="isLoading">
          <option value="buy">
            {{ $t('home.form.type.values.buy') }}
          </option>
          <option value="rent">
            {{ $t('home.form.type.values.rent') }}
          </option>
        </select>
      </div>

      <div class="divider"></div>

      <div class="flex flex-1 flex-col px-4">
        <label for="location" class="font-semibold">
          {{ $t('home.form.location.label') }}
        </label>
        <select v-model="propertyLocation" name="location" id="location" :form="formId" :disabled="isLoading">
          <option :value="null" disabled selected hidden>{{ $t('home.form.location.placeholder') }}</option>
          <option :key="location.id" v-for="location in locations" :value="location.id">
            {{ location.name }}
          </option>
        </select>
      </div>

      <div class="divider"></div>

      <div class="flex flex-1 flex-col px-4">
        <label for="priceRange" class="font-semibold">
          {{ $t('home.form.priceRange.label') }}
          <input
            :placeholder="$t('home.form.priceRange.placeholder')"
            v-model="propertyPriceRange"
            :disabled="isLoading"
            name="priceRange"
            id="priceRange"
            :form="formId"
            type="number"
          />
        </label>
      </div>

      <div v-if="isLoading" class="rounded-full bg-black w-12 h-12">
        <Spinner />
      </div>
      <button v-else type="submit" class="rounded-full bg-black w-12 h-12 text-white">
        <LensIcon class="mx-auto" />
      </button>
    </div>
  </form>
</template>

<style scoped>
.divider {
  @apply h-[32px] w-px bg-gray;
}
</style>
