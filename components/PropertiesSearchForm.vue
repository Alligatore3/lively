<script setup lang="ts">
const formId = 'home-search-form';

function onSubmit() {
  console.log('preve');
}
</script>

<template>
  <form :id="formId" @submit.prevent="onSubmit" class="rounded-[30px] border border-gray w-[666px] bg-white p-1">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-1 flex-col px-4">
        <label for="type" class="font-semibold">
          {{ $t('home.form.type.label') }}
        </label>
        <select name="type" id="type" :form="formId">
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
          <input :placeholder="$t('home.form.location.placeholder')" type="text" id="location" name="location" />
        </label>
      </div>

      <div class="divider"></div>

      <div class="flex flex-1 flex-col px-4">
        <label for="priceRange" class="font-semibold">
          {{ $t('home.form.priceRange.label') }}
          <input :placeholder="$t('home.form.priceRange.placeholder')" name="priceRange" id="priceRange" type="text" />
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
