<script setup lang="ts">
import { createPropertyMock } from '@/utils/createPropertyMock';

const properties = [
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
  createPropertyMock(),
];
</script>

<template>
  <ContentWithFilters>
    <div class="grid grid-rows-3 grid-flow-col gap-3">
      <NuxtLink
        :to="{ name: 'properties-id', params: { id: property.id } }"
        v-for="property in properties"
        :key="property.id"
      >
        <PropertyCard :property="property" />
      </NuxtLink>
    </div>
  </ContentWithFilters>
</template>
