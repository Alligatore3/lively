<script setup lang="ts">
import type { Agency } from '@/types/Agency';

type Props = {
  agency: Agency;
};

const { agency } = defineProps<Props>();
</script>

<template>
  <div class="relative border rounded-2xl h-[250px] w-full overflow-hidden">
    <div id="agency-avatar">
      <NuxtImg
        class="rounded-full w-16 h-16 mx-auto my-6"
        :src="agency.image"
        :alt="agency.name"
        objectFit="cover"
        layout="fill"
      />
    </div>

    <div class="text-center">
      <h2 class="font-bold text-xl">{{ agency.name }}</h2>

      <CaptionText class="mt-2 mb-4">
        {{ $t('agencies.propertiesCount', { count: agency.properties?.length ?? 0 }) }}
      </CaptionText>

      <NuxtLink
        :to="{ name: 'agencies-slug', params: { slug: agency.slug } }"
        class="bg-black text-white py-2 px-4 rounded-lg"
      >
        {{ $t('agencies.view') }}
      </NuxtLink>
    </div>
  </div>
</template>
