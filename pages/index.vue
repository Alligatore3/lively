<template>
  <div class="flex">
    <div class="flex-1 p-4">
      <p>
        Lively - Nuxt
      </p>o

      <NuxtLink to="/agencies">
        But check Agencies
      </NuxtLink>
    </div>
    <div :style="{ backgroundImage: `url(~@/assets/images/house.jpg)` }" class="flex-1"></div>
</div>
</template>
  