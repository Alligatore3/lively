<template>
  <div class="navigation flex items-center gap-0 md:gap-24 justify-between md:justify-start text-white py-4">
    <h1 class="text-2xl font-extrabold">
      <NuxtLink to="/">{{ $t('logo') }}</NuxtLink>
    </h1>
    <nav class="flex items-center gap-8">
      <NuxtLink active-class="is-active" class="relative" to="/properties">{{ $t('navigation.properties') }}</NuxtLink>
      <NuxtLink active-class="is-active" class="relative" to="/agencies">{{ $t('navigation.agencies') }}</NuxtLink>
    </nav>
  </div>
</template>

<style lang="css" scoped>
nav a.is-active::after {
  @apply absolute inset-x-0 bg-white rounded-lg -bottom-1 mx-auto;
  content: '';
  height: 3px;
  width: 15px;
}
</style>
