<template>
  <div class="grid grid-rows-3 grid-flow-col gap-3">
    <PropertyCardSkeleton v-for="index in 9" :key="index" />
  </div>
</template>
