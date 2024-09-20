<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';

const { token } = useLivelyStore();
</script>

<template>
  <main class="w-full h-screen bg-black">
    <MainHeader />
    <div class="container mx-auto h-full">
      <PageWrapper>
        <code>Token is: {{ token }}</code>
        <slot />
      </PageWrapper>
    </div>
  </main>
</template>
