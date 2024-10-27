<template>
  <div class="flex flex-col md:flex-row p-4 h-full gap-4 md:gap-0">
    <aside class="md:w-1/4 md:h-full">
      <slot name="sidebar" />
    </aside>

    <div class="md:w-3/4 md:h-full overflow-y-scroll">
      <slot name="content" />
    </div>
  </div>
</template>
