<script setup lang="ts">
const animationURLs = ['0.gif', '1.gif', '2.gif']

const randomAnimation = () => {
  const randomIndex = Math.round(Math.random() * (animationURLs.length - 1))

  return animationURLs[randomIndex]
}
</script>

<template>
  <div class="animation"><img :src="'src/assets/animations/' + randomAnimation()" /></div>
</template>

<style scoped>
.animation {
  display: flex;
  width: 100%;

  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
}
.animation img {
  width: 196px;
  height: 196px;
}
</style>
