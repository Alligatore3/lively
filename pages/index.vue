<script setup lang="ts">
import houseImage from '~/assets/images/house.png';

const backgroundImage = `url(${houseImage})`;

const formId = 'home-search-form';

function onSubmit() {
  console.log('preve');
}
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
              <label for="type" class="font-semibold">
                {{ $t('home.form.location.label') }}
              </label>
            </div>

            <div class="divider"></div>

            <div class="flex flex-1 flex-col px-4">
              <label for="type" class="font-semibold">
                {{ $t('home.form.priceRange.label') }}
              </label>
            </div>

            <button type="submit" class="rounded-full bg-black w-12 h-12">🔎</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider {
  @apply h-[32px] w-px bg-gray;
}
</style>
