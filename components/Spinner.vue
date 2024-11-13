<script lang="ts" setup>
type Props = {
  classes?: string;
};

const { classes } = defineProps<Props>();
</script>

<template>
  <div class="spinner text-white" :class="classes"></div>
</template>

<style lang="css" scoped>
.spinner,
.spinner:after {
  box-sizing: border-box;
}
.spinner {
  display: inline-block;
}

.spinner:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  border-style: solid;
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
