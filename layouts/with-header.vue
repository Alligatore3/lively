<template>
  <main class="w-full h-screen bg-black">
    <MainHeader />
    <div class="container mx-auto h-full">
      <PageWrapper>
        <slot />
      </PageWrapper>
    </div>
  </main>
</template>
