<script setup lang="ts">
import houseImage from '~/assets/images/house.png';

const backgroundImage = `url(${houseImage})`;
</script>

<template>
  <div class="w-full h-full">
    <div :style="{ backgroundImage }" class="h-full bg-right-bottom bg-no-repeat">
      <div class="p-16">
        <h3 class="font-bold text-8xl" v-html="$t('home.title')" />
        <p class="max-w-[560px] my-4 text-2xl">
          {{ $t('home.description') }}
        </p>
      </div>
    </div>
  </div>
</template>
