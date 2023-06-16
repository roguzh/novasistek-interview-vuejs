<script setup lang="ts">
import '@/assets/fonts/fonts.css'
import type { Comic } from '../../types/types';
import { ref, onMounted, computed, type Ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const MAX_DESC_CHAR_COUNT = 228
const MAX_TITLE_CHAR_COUNT = 86


const props = defineProps<{
  comic: Comic
}>()

const comic: Comic = props.comic;

const isHovered = ref(false)

const getCreatorString = (comic: Comic) => {
  const creatorString = comic.creators.items
    .reduce((acc, prevCreator) => `${acc} • ${prevCreator.name}`, '')
    .substring(2)

  return creatorString.length > MAX_TITLE_CHAR_COUNT
    ? creatorString.substring(0, MAX_TITLE_CHAR_COUNT) + '...'
    : creatorString
}

// const isComicHovered = (comicID: number) => {
//   const comic = comics.value.find((c: any) => c.id == comicID)

//   return comic ? comic.isHovered : false
// }

const test = () => {
  console.log("test");
}

const setHovered = (state: boolean) => {
  isHovered.value = state;
  //   const index = comics.value.findIndex((c: any) => c.id == comicID)
  //   if (index != -1) {
  //     comics.value[index].isHovered = state
  //   }
}

const setFavourite = ($event: MouseEvent) => {
  $event.stopPropagation();
  store.commit('changeComicFavState', comic.id)
}
</script>

<template>
  <div
    :class="'comic ' + `${isHovered ? 'hovered' : 'unhovered'}`"
    @mouseenter="setHovered(true)"
    @mouseleave="setHovered(false)"
  >
    <div class="favourite-badge-wrapper">
      <img
        alt="Favourite Badge"
        class="logo"
        :src="
          store.getters.isComicFav(comic.id)
            ? 'src/assets/icons/filled_star.png'
            : 'src/assets/icons/empty_star.png'
        "
        @click="setFavourite"
      />
    </div>
    <div class="thumbnail">
      <img
        :src="`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`"
        alt="Comic's Thumbnail"
      />
    </div>
    <div class="details">
      <div class="base-information">
        <div class="title">{{ comic.title.toLocaleUpperCase() }}</div>
      </div>
      <div class="description">
        {{
          comic.description && comic.description != '#N/A'
            ? comic.description.length >= MAX_DESC_CHAR_COUNT
              ? comic.description.substring(0, MAX_DESC_CHAR_COUNT) + '...'
              : comic.description
            : ''
        }}
      </div>
      <div class="creators-wrapper">
        {{ getCreatorString(comic) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comic {
  width: 248px;
  height: 338px;

  border-radius: 6px;

  overflow: hidden;
  position: relative;

  cursor: pointer;

  box-shadow: rgb(0 0 0 / 100%) 0px 7px 34px -9px;

  // &:hover {
  //   transform: scale(1.15);
  //   transition: 0.55s ease-in-out;

  //   .details {
  //     top: 214px;
  //     transition: 0.55s ease-in-out;
  //   }
  // }
}

.comic.hovered {
  transform: scale(1.15);
  transition: 0.55s ease-in-out;

  .details {
    bottom: 0%;
    transition: 0.55s ease-in-out;
  }
}

.comic.unhovered {
  transform: scale(1);
  transition: 0.55s ease-in-out;

  .details {
    bottom: -224px;
    transition: 0.55s ease-in-out;
  }
}

.favourite-badge-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;

  &:hover {
    transform: scale(1.25);
    transition: 1s;
  }
}

.logo {
  filter: drop-shadow(0px 0px 1px #ffffffaa) drop-shadow(0px 0px 2px #ffffffaa);
}

.thumbnail {
  display: flex;

  align-items: center;
  justify-content: center;
}

.thumbnail img {
  width: 100%;
  height: 338px;
}

.details {
  position: relative;
  margin-top: -6px;

  padding: 8px 10px;

  width: 100%;

  background: var(--vt-c-black-mute);

  position: absolute;
  font-family: 'Roboto';
}

.title {
  text-align: center;

  margin-bottom: -4px;
  margin-top: 0px;

  color: white;

  font-size: 16px;
  font-weight: 600;
  font-family: 'Roboto';

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  font-size: 10px;
  text-align: justify;

  margin-top: 4px;

  color: var(--vt-c-white-mute);
}
.creators-wrapper {
  text-align: center;
  margin-top: 6px;
  font-size: 10px;
  font-weight: bold;
  color: white;
}
</style>
