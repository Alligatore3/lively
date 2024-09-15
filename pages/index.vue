<script setup lang="ts">
import PropertiesSearchForm from '@/components/PropertiesSearchForm';
import houseImage from '~/assets/images/house.png';

const backgroundImage = `url(${houseImage})`;
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

        <PropertiesSearchForm />
      </div>
    </div>
  </div>
</template>
