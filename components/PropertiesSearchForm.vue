<script setup lang="ts">
type Props = {
  onSubmit: () => void;
};

const { onSubmit } = defineProps<Props>();

const formId = 'home-search-form';

const type = ref<'buy' | 'rent'>('buy');

const location = ref<string | null>(null);

const priceRange = ref<number | null>(null);
</script>

<template>
  <form :id="formId" @submit.prevent="onSubmit" class="rounded-[30px] border border-gray w-[666px] bg-white p-1">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-1 flex-col px-4">
        <label for="type" class="font-semibold">
          {{ $t('home.form.type.label') }}
        </label>
        <select v-model="type" name="type" id="type" :form="formId">
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
          <input
            :placeholder="$t('home.form.location.placeholder')"
            v-model="location"
            name="location"
            :form="formId"
            id="location"
            type="text"
          />
        </label>
      </div>

      <div class="divider"></div>

      <div class="flex flex-1 flex-col px-4">
        <label for="priceRange" class="font-semibold">
          {{ $t('home.form.priceRange.label') }}
          <input
            :placeholder="$t('home.form.priceRange.placeholder')"
            v-model="priceRange"
            name="priceRange"
            id="priceRange"
            :form="formId"
            type="number"
          />
        </label>
      </div>

      <button type="submit" class="rounded-full bg-black w-12 h-12">🔎</button>
    </div>
  </form>
</template>

<style scoped>
.divider {
  @apply h-[32px] w-px bg-gray;
}
</style>
