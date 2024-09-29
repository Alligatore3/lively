<script setup lang="ts">
useHead({
  title: 'Lively - Real Estate Platform',
  link: [{ href: 'favicon.png', type: 'image/png', rel: 'icon' }],
  meta: [
    {
      name: 'description',
      content:
        'Lively can help you rent, sell, or buy accomodation, take a mortage, invest in real estate, and a lot more',
    },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout name="with-header">
    <NuxtPage />
    <NuxtSnackbar />
  </NuxtLayout>
</template>
