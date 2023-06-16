<script setup lang="ts">
import loading_0 from '@/assets/animations/0.gif'
import loading_1 from '@/assets/animations/1.gif'
import loading_2 from '@/assets/animations/2.gif'


const animationURLs = [loading_2]

const randomAnimation = () => {
  const randomIndex = Math.round(Math.random() * (animationURLs.length - 1))

  return animationURLs[randomIndex]
}
</script>

<template>
  <div class="animation"><img :src="randomAnimation()" /></div>
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
