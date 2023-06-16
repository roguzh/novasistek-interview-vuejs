<script setup lang="ts">
import '@/assets/fonts/fonts.css'
import type { Comic } from '@/types/types'
import { ref, onMounted, computed, type Ref } from 'vue'
import { useStore } from 'vuex'
import ComicCard from './ComicCard.vue'
import Details from './Details.vue'

const store = useStore()

const MAX_DESC_CHAR_COUNT = 228
const MAX_TITLE_CHAR_COUNT = 86

const toggledComics = computed(() => {
  const filteredComics = store.state.comicList
    .map((c: Comic) => ({ ...c, isHovered: false }))
    .filter((c: Comic) => !c.thumbnail.path.includes('image_not_available'))

  return !store.state.toggleFavourites
    ? filteredComics
    : filteredComics.filter((c: Comic) => store.getters.isComicFav(c.id))
})

const setSelectedComic = ($event: MouseEvent, comic: Comic) => {
  $event.stopPropagation()
  store.commit('setSelectedComic', comic)
}

const closeDetailedComics = () => {
  if (store.state.selectedComic) {
    store.commit('setSelectedComic', null)
  }
}

const avoidClick = ($event: MouseEvent) => {
  $event.stopPropagation()
}

</script>

<template>
  <div class="wrapper" @click="closeDetailedComics">
    <ComicCard
      v-for="comic in toggledComics"
      :key="comic.title"
      :comic="comic"
      @click="setSelectedComic($event, comic)"
    />
  </div>
  <Details
    v-if="store.state.selectedComic"
    :comic="store.state.selectedComic"
    @click="avoidClick"
  />
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1480px;

  width: 100%;

  padding: 48px;

  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  gap: 36px;
}
</style>
