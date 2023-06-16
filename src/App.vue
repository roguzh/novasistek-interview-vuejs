<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from './components/header/Header.vue';

const store = useStore();

onMounted(async () => {
  try {
    store.dispatch('fetchComics')
  } catch (error) {
    console.error('Error fetching user list:', error)
  }
})
</script>

<template>
  <Header/>
  <RouterView />
</template>

<style scoped>

</style>
