<script setup lang="ts">
import '@/assets/fonts/fonts.css'
import type { Comic } from '@/types/types'
import { ref, onMounted, computed, type Ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const MAX_DESC_CHAR_COUNT = 228
const MAX_TITLE_CHAR_COUNT = 86

const title = 'Placeholder Title'
const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices massa non vehicula molestie. Vestibulum tincidunt ut orci eget iaculis. Vestibulum tincidunt ut orci eget iaculis.'

const creators = {
  items: [
    {
      name: 'Creator 1',
      role: 'Writer'
    },
    {
      name: 'Creator 2',
      role: 'Designer'
    },
    {
      name: 'Creator 3',
      role: 'Publisher'
    }
  ]
}

const thumbnail = {
  path: 'https://i.annihil.us/u/prod/marvel/i/mg/d/00/56f462d8f0eef',
  extension: 'jpg'
}
const dumpComic = {
  id: 0,
  title,
  description,
  creators,
  thumbnail,
  isHovered: false
}

// const comics = ref([
//   dumpComic,
//   { ...dumpComic, id: 1 },
//   { ...dumpComic, id: 2 },
//   { ...dumpComic, id: 3 },
//   { ...dumpComic, id: 4 },
//   { ...dumpComic, id: 5 },
//   { ...dumpComic, id: 6 },
//   { ...dumpComic, id: 7 },
//   { ...dumpComic, id: 8 }
// ])

interface ComicItem extends Comic {
  isHovered: boolean
}

const comics: Ref<ComicItem[]> = ref([])

const getCreatorString = (comic: Comic) => {
  const creatorString = comic.creators.items
                .reduce((acc, prevCreator) => `${acc} • ${prevCreator.name}`, '')
                .substring(2);

  return creatorString.length > MAX_TITLE_CHAR_COUNT ? creatorString.substring(0, MAX_TITLE_CHAR_COUNT) + '...' : creatorString; 
}

const isComicHovered = (comicID: number) => {
  const comic = comics.value.find((c: any) => c.id == comicID)

  return comic ? comic.isHovered : false
}

const setHovered = (comicID: number, state: boolean) => {
  const index = comics.value.findIndex((c: any) => c.id == comicID)
  if (index != -1) {
    comics.value[index].isHovered = state
  }
}

onMounted(async () => {
  comics.value = store.state.comicList
    .map((c: Comic) => ({ ...c, isHovered: false }))
    .filter((c: Comic) => !c.thumbnail.path.includes('image_not_available'))
  try {
    store.dispatch('fetchComics')
    console.log('fetching')
  } catch (error) {
    console.error('Error fetching user list:', error)
  }
})
</script>

<template>
  <div class="wrapper">
    <div
      v-for="comic in (store.state.toggleFavourites ? comics : comics.filter((c) => store.getters.isComicFav(c.id)))"
      :key="comic.title"
      :class="'comic ' + `${isComicHovered(comic.id) ? 'hovered' : 'unhovered'}`"
      @mouseenter="setHovered(comic.id, true)"
      @mouseleave="setHovered(comic.id, false)"
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
          @click="store.commit('changeComicFavState', comic.id)"
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
            comic.description && comic.description != "#N/A"
              ? comic.description.length >= MAX_DESC_CHAR_COUNT
                ? comic.description.substring(0, MAX_DESC_CHAR_COUNT) + '...'
                : comic.description
              : ''
          }}
        </div>
        <div class="creators-wrapper">
          {{
            getCreatorString(comic)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  max-width: 1480px;

  width: 100%;
  height: 560px;

  padding: 48px;

  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: center;

  gap: 36px;
}

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
  //   transition: 0.66s ease-in-out;

  //   .details {
  //     top: 214px;
  //     transition: 0.66s ease-in-out;
  //   }
  // }
}

.comic.hovered {
  transform: scale(1.15);
  transition: 0.66s ease-in-out;

  .details {
    bottom: 0%;
    transition: 0.66s ease-in-out;
  }
}

.comic.unhovered {
  transform: scale(1);
  transition: 0.66s ease-in-out;

  .details {
    bottom: -224px;
    transition: 0.66s ease-in-out;
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

  margin-top: 2px;

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
