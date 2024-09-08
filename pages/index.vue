<script setup lang="ts">
import houseImage from '~/assets/images/house.jpg';

const backgroundImage = `url(${houseImage})`;
</script>

<template>
  <div class="flex h-full">
    <div class="flex-1 p-4">
      <p>Lively - Nuxt</p>

      <NuxtLink to="/agencies"> But check Agencies </NuxtLink>
    </div>
    <div :style="{ backgroundImage }" class="flex-1 bg-center bg-cover bg-no-repeat"></div>
  </div>
</template>
