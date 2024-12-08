<script setup lang="ts">
import { ref } from 'vue';
import VueSlider from 'vue-3-slider-component';

type Props = {
  onRangeChange: (values: number[]) => void;
};

const minValue = ref(0);

const maxValue = ref(10);

const { onRangeChange } = defineProps<Props>();

const sliderValues = ref([minValue.value, maxValue.value]);

function onInputChange(value: string, name: string) {
  if (name === 'minValue') {
    minValue.value = parseInt(value, 10);
    sliderValues.value = [minValue.value, maxValue.value];

    onRangeChange(sliderValues.value);
  }

  if (name === 'maxValue') {
    maxValue.value = parseInt(value, 10);
    sliderValues.value = [minValue.value, maxValue.value];

    onRangeChange(sliderValues.value);
  }
}

function onSliderChange(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  minValue.value = min;
  maxValue.value = max;

  onRangeChange([min, max]);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <slot name="label" />

    <VueSlider v-model="sliderValues" tooltip="none" @change="onSliderChange" />

    <div class="flex gap-2 w-full align-center">
      <UInput
        v-model="minValue"
        :ui="{ form: 'w-[50px] border rounded dark:bg-white' }"
        variant="none"
        name="minValue"
        type="number"
        size="2xs"
        min="0"
        @change="(value: string) => onInputChange(value, 'minValue')"
      />
      <span> - </span>
      <UInput
        v-model="maxValue"
        size="2xs"
        :ui="{ form: 'w-[50px] border rounded dark:bg-white' }"
        variant="none"
        name="maxValue"
        type="number"
        min="0"
        @change="(value: string) => onInputChange(value, 'maxValue')"
      />
    </div>
  </div>
</template>
