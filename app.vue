<script setup lang="ts">
const livelyTitle = 'Lively - Real Estate Platform';
const livelyDescription =
  'Lively can help you rent, sell, or buy accomodation, take a mortage, invest in real estate, and a lot more';

useHead({
  link: [{ href: 'favicon.png', type: 'image/png', rel: 'icon' }],
  title: livelyTitle,
  meta: [
    {
      content: livelyDescription,
      name: 'description',
    },
  ],
});

useSeoMeta({
  description: livelyDescription,
  title: livelyTitle,
});
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout name="with-header">
    <NuxtPage />
    <NuxtSnackbar />
  </NuxtLayout>
</template>
