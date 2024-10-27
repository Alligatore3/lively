<template>
  <div class="flex flex-col w-full h-full bg-black">
    <div class="container mx-auto px-4 md:px-0 h-full">
      <MainHeader />
      <div :style="{ height: 'calc(100% - 80px)' }" class="pb-4">
        <PageWrapper>
          <slot />
        </PageWrapper>
      </div>
    </div>
  </div>
</template>
