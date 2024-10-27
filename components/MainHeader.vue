<template>
  <div class="container mx-auto">
    <div class="navigation flex items-center gap-32 text-white p-4">
      <h1 class="text-2xl font-extrabold">
        <NuxtLink to="/">{{ $t('logo') }}</NuxtLink>
      </h1>
      <nav class="flex items-center gap-8">
        <NuxtLink exact class="relative pb-1" to="/properties">{{ $t('navigation.properties') }}</NuxtLink>
        <NuxtLink class="relative pb-1" to="/agencies">{{ $t('navigation.agencies') }}</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style lang="css" scoped>
nav a.router-link-active.router-link-exact-active::after {
  @apply absolute inset-x-0 bg-white rounded-lg bottom-0 mx-auto;
  content: '';
  height: 3px;
  width: 15px;
}
</style>
