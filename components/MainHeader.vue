<template>
  <div class="container mx-auto">
    <div class="navigation flex items-center gap-32 text-white p-4">
      <h1 class="text-2xl font-extrabold">
        <NuxtLink to="/">{{ $t('logo') }}</NuxtLink>
      </h1>
      <nav class="flex items-center gap-8">
        <NuxtLink to="/properties">{{ $t('navigation.properties') }}</NuxtLink>
        <NuxtLink to="/agencies">{{ $t('navigation.agencies') }}</NuxtLink>
      </nav>
    </div>
  </div>
</template>
