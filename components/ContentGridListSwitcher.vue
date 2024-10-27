<script setup lang="ts">
import BurgerIcon from '@/components/icons/BurgerIcon';
import GridIcon from '@/components/icons/GridIcon';

const gridLayout = ref<'grid' | 'list'>('grid');

const isGridLayout = computed<boolean>(() => gridLayout.value === 'grid');

const gridClasses = computed<string[]>(() => {
  const deafultClasses = ['my-4 transition-all duration-300 ease-in-out'];

  return isGridLayout.value
    ? [...deafultClasses, 'grid grid-flow-col grid-rows-12 md:grid-rows-6 xl:grid-rows-3 gap-4']
    : [...deafultClasses, 'flex gap-4 flex-col w-full'];
});

function toggleLayout() {
  gridLayout.value = isGridLayout.value ? 'list' : 'grid';
}
</script>

<template>
  <div>
    <div>
      <ul class="flex flex-column gap-4">
        <li class="leading-[0]" :class="isGridLayout ? 'text-black' : 'text-gray'">
          <button class="leading-[0]" @click="toggleLayout">
            <GridIcon />
          </button>
          <span class="sr-only">Grid layout toggle</span>
        </li>
        <li class="leading-[0]" :class="!isGridLayout ? 'text-black' : 'text-gray'">
          <button class="leading-[0]" @click="toggleLayout">
            <BurgerIcon />
          </button>
          <span class="sr-only">List layout toggle</span>
        </li>
      </ul>
    </div>
    <ul :class="gridClasses">
      <slot name="loop-list" />
    </ul>
  </div>
</template>
