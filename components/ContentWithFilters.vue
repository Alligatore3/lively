<script setup lang="ts"></script>

<template>
  <div class="flex p-4 h-full">
    <div class="w-2/6 h-full">filters</div>
    <div class="flex-grow h-full">
      <slot />
    </div>
  </div>
</template>
