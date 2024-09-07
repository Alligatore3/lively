<script setup lang="ts">
/**
 * '48 => 24 * 2' - '24 => temp MainHeader height' - '1rem => m-1 class below'
 */
const height = 'calc(100% - 48px - 1rem)'
</script>

<template>
    <div class="w-auto h-auto bg-white m-4 rounded-[20px] overflow-hidden" :style="{ height }">
        <slot />
    </div>
</template>
    