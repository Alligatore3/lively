<script setup lang="ts">
const height = 'calc(100% - 64px - 1rem)';
</script>

<template>
  <div class="w-auto h-auto bg-white mx-4 rounded-[20px] overflow-hidden" :style="{ height }">
    <slot />
  </div>
</template>
