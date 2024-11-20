<script lang="ts" setup>
import { ROUTES } from '@/constants';
</script>

<template>
  <nav class="navigation flex items-center gap-0 md:gap-24 justify-between md:justify-start text-white py-4 mx-9">
    <NuxtLink class="text-2xl font-extrabold" :to="ROUTES.HOME">{{ $t('logo') }}</NuxtLink>

    <ul class="flex items-center gap-8">
      <NuxtLink active-class="is-active" class="relative" :to="ROUTES.PROPERTIES">{{
        $t('navigation.properties')
      }}</NuxtLink>
      <NuxtLink active-class="is-active" class="relative" :to="ROUTES.AGENCIES">{{
        $t('navigation.agencies')
      }}</NuxtLink>
    </ul>
  </nav>
</template>

<style lang="css" scoped>
nav a.is-active {
  @apply underline underline-offset-1;
}
</style>
