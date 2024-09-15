<script setup lang="ts">
const route = useRoute();

const type = ref<'buy' | 'rent' | null>(null);

const location = ref<string | null>(null);

const priceRange = ref<number | null>(null);

/**
 * @todo 'useRoute' is not updating values.
 */
function initPropertiesSearch() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  priceRange.value = Number(urlParams.get('priceRange'));
  type.value = urlParams.get('type') as 'buy' | 'rent';
  location.value = urlParams.get('location');
}

watch(() => route.fullPath, initPropertiesSearch);

onMounted(initPropertiesSearch);
</script>

<template>
  <div class="p-4">
    <h1>Lively - Properties</h1>

    Current search:
    <br />
    <code>priceRange: {{ priceRange || 'Not defined' }} </code>
    <br />
    <code>location: {{ location || 'Not defined' }} </code>
    <br />
    <code>type: {{ type }} </code>
  </div>
</template>
