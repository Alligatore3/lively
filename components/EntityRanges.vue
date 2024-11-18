<script setup lang="ts">
import VueSlider from 'vue-3-slider-component';
import { ref } from 'vue';

const minValue = ref(0);
const maxValue = ref(10);

const sliderValues = ref([minValue.value, maxValue.value]);

function onInputChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const { name, value } = target;

  if (name === 'minValue') {
    minValue.value = parseInt(value, 10);
    sliderValues.value = [minValue.value, maxValue.value];
  }

  if (name === 'maxValue') {
    maxValue.value = parseInt(value, 10);
    sliderValues.value = [minValue.value, maxValue.value];
  }
}

function onSliderChange(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  minValue.value = min;
  maxValue.value = max;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <slot name="label" />

    <VueSlider v-model="sliderValues" @change="onSliderChange" tooltip="none" />

    <div class="flex gap-2 w-full justify-center align-center">
      <input
        class="w-[100px] border rounded"
        @change="onInputChange"
        v-model="minValue"
        name="minValue"
        type="number"
        min="0"
      />
      <span> - </span>
      <input
        class="w-[100px] border rounded"
        @change="onInputChange"
        v-model="maxValue"
        name="maxValue"
        type="number"
        min="0"
      />
    </div>
  </div>
</template>

<style lang="css">
.vue-slider-rail {
  @apply h-0.5;
}

.vue-slider-process {
  @apply bg-black;
}
.vue-slider-dot-handle {
  @apply bg-black relative shadow;
}

.vue-slider-dot-handle:after {
  @apply bg-white absolute rounded-full;
  content: '';
  height: 50%;
  width: 50%;
  left: 25%;
  top: 25%;
}
</style>
