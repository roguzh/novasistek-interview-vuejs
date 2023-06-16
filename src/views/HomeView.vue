<script setup lang="ts">
import { useStore } from 'vuex'
import Comics from '../components/comics/Comics.vue'
import Loading from '../components/loading/Loading.vue'

const store = useStore()
</script>

<template>
  <main>
    <Loading v-if="store.state.isLoading" />
    <Comics v-else />
  </main>
</template>
