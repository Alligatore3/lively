<script setup lang="ts">
import { useLivelyStore } from '@/stores/useLivelyStore';

const route = useRoute();

const { getPropertyBySlug, propertyBySlug, isLoading } = useLivelyStore();

const properyURLSlug = computed<string | null>(() => {
  const slug = route.params.slug;
  return isString(slug) ? slug : null;
});

const items = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1678903964473-1271ecfb0288?q=80&w=3987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    src: 'https://plus.unsplash.com/premium_photo-1680281937048-735543c5c0f7?q=80&w=2222&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

/**
 * @see https://flowbite.com/docs/components/gallery/#masonry-grid
 */
function chunkArray(items: { src: string }[], chunkSize = 3) {
  const chunks = [];
  let i = 0;
  const n = items.length;

  while (i < n) {
    const chunk = items.slice(i, i + chunkSize);
    chunks.push(chunk);
    i += chunkSize;
  }

  return chunks;
}

const chunkedItems = chunkArray(items);

onMounted(() => {
  getPropertyBySlug(properyURLSlug.value);
});
</script>

<template>
  <div class="p-4 h-auto max-h-[500px] overflow-auto">
    {{ propertyBySlug }}
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div :key="index" v-for="(chunk, index) in chunkedItems" class="grid gap-4">
        <div v-for="image in chunk">
          <img class="h-auto max-w-full rounded-lg" :src="image.src" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
