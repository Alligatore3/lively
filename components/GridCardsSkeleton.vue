<template>
  <div class="grid grid-rows-3 grid-flow-col gap-3">
    <GridCardSkeleton v-for="index in 9" :key="index" />
  </div>
</template>
