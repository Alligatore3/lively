<script setup lang="ts">
import type { Agency } from '@/types/Agency';
import CheckIcon from '@/components/icons/CheckIcon';

type Props = {
  agency: Agency;
};

const { agency } = defineProps<Props>();
</script>

<template>
  <div>
    <div class="md:my-10">
      <NuxtImg :src="agency.image" :alt="agency.name" class="w-16 h-16 rounded-full border" />

      <h2 class="font-semibold mt-4 mb-1">{{ agency.name }}</h2>

      <CaptionText>
        {{ $t('agencies.propertiesCount', { count: agency.properties.length }) }}
      </CaptionText>
    </div>

    <ReadMoreWrapper :description="agency.description">
      <template #label>
        <p class="font-bold text-xl">{{ $t('agencies.about') }}</p>
      </template>
    </ReadMoreWrapper>

    <ul class="flex flex-row gap-5 mt-9 flex-wrap">
      <li class="flex flex-row items-center gap-1 font-bold">
        <CheckIcon />
        <a class="underline" :href="`tel:+${agency.mobile}`">
          {{ agency.mobile }}
        </a>
      </li>
      <li class="flex flex-row items-center gap-1 font-bold">
        <CheckIcon />
        <a class="underline" :href="`mailto:${agency.email}`">
          {{ agency.email }}
        </a>
      </li>
    </ul>
  </div>
</template>
