<script setup lang="ts">
type Props = {
  description: string;
};

const { t } = useI18n();

const { description } = defineProps<Props>();

const isTruncated = ref(true);
</script>

<template>
  <div class="flex flex-col gap-3 items-start">
    <slot name="label" />

    <p :class="isTruncated ? 'line-clamp-2' : undefined">
      {{ description }}
    </p>

    <button class="underline font-semibold" @click="isTruncated = !isTruncated">
      {{ isTruncated ? t('shared.readMore') : t('shared.readLess') }}
    </button>
  </div>
</template>
