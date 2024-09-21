<template>
  <div class="spinner text-white"></div>
</template>

<style lang="css" scoped>
.spinner,
.spinner:after {
  box-sizing: border-box;
}
.spinner {
  display: inline-block;
  @apply h-[32px] w-[32px];
}
.spinner:after {
  content: ' ';
  display: block;
  width: 32px;
  height: 32px;
  margin: 8px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: spinner-animation 1.2s linear infinite;
}
@keyframes spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
