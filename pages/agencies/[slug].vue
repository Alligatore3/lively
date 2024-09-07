<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <NuxtLink to="/agencies">Back to agencies</NuxtLink>
    <br />
    <h1>Agency: {{ route.params.slug }}</h1>
  </div>
</template>