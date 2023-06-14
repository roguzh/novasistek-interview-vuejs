<script setup lang="ts">
import Featured from '../components/featured/Featured.vue';
import type { Comic } from '@/types/types';
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';

const comicList = ref<Comic[]>([]);
const store = useStore();

onMounted(async () => {
  comicList.value = store.state.comicList;
  try {
    store.dispatch('fetchComics');
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
});

</script>

<template>
  <main>
    <Featured />
  </main>
</template>
