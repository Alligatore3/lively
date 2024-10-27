<script setup lang="ts">
const height = 'calc(100% - 64px - 1rem)';
</script>

<template>
  <div class="w-auto h-auto bg-white mx-4 rounded-[20px] overflow-x-hidden overflow-y-auto" :style="{ height }">
    <slot />
  </div>
</template>
