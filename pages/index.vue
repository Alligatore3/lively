<script setup lang="ts">
import houseImage from '~/assets/images/house.jpg';

const backgroundImage = `url(${houseImage})`;
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 p-16">
      <h3 class="font-bold text-8xl" v-html="$t('home.title')" />
      <p class="max-w-[560px] my-4 text-2xl">
        {{ $t('home.description') }}
      </p>
    </div>
    <div :style="{ backgroundImage }" class="flex-1 bg-center bg-cover bg-no-repeat"></div>
  </div>
</template>
