<script setup lang="ts">
import { livelyTitle, livelyDescription } from '@/utils/generateSocialMetaAttributes';

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
    <UModals />
  </NuxtLayout>
</template>
