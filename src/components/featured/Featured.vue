<script setup lang="ts">
import '@/assets/fonts/fonts.css'
import type { Comic } from '@/types/types'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const MAX_DESC_CHAR_COUNT = 183

const title = 'Placeholder Title'
const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices massa non vehicula molestie. Vestibulum tincidunt ut orci eget iaculis. Vestibulum tincidunt ut orci eget iaculis.'

const creators = [
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

const thumbnail = 'https://i.annihil.us/u/prod/marvel/i/mg/d/00/56f462d8f0eef/clean.jpg'

const dumpComic = {
  id: 0,
  title,
  description,
  creators,
  thumbnail,
  isHovered: false
}

const featuredComics = ref([
  dumpComic,
  { ...dumpComic, id: 1 },
  { ...dumpComic, id: 2 },
  { ...dumpComic, id: 3 },
  { ...dumpComic, id: 4 }
])

const isComicHovered = (comicID: number) => {
  const comic = featuredComics.value.find((c) => c.id == comicID)

  return comic ? comic.isHovered : false
}

const setHovered = (comicID: number, state: boolean) => {
  const index = featuredComics.value.findIndex((c) => c.id == comicID)
  if (index != -1) {
    console.log(state)
    featuredComics.value[index].isHovered = state
  }
}
</script>

<template>
  <div class="wrapper">
    <div
      v-for="comic in featuredComics"
      :key="comic.title"
      :class="'featured-comic ' + `${isComicHovered(comic.id) ? 'hovered' : 'unhovered'}`"
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
        <img :src="thumbnail" alt="Comic's Thumbnail" />
      </div>
      <div class="details">
        <div class="base-information">
          <div class="title">{{ title.toLocaleUpperCase() }}</div>
        </div>
        <div class="description">
          {{
            comic.description.length >= MAX_DESC_CHAR_COUNT
              ? comic.description.substring(0, MAX_DESC_CHAR_COUNT) + '...'
              : comic.description
          }}
        </div>
        <div class="creators-wrapper">
          {{
            comic.creators
              .reduce((acc, prevCreator) => `${acc} • ${prevCreator.name}`, '')
              .substring(2)
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

.featured-comic {
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

.featured-comic.hovered {
  transform: scale(1.15);
  transition: 0.66s ease-in-out;

  .details {
    top: 214px;
    transition: 0.66s ease-in-out;
  }
}

.featured-comic.unhovered {
  transform: scale(1);
  transition: 0.66s ease-in-out;

  .details {
    top: 302px;
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
  top: 302px;
}

.title {
  text-align: center;

  margin-bottom: -2px;

  font-size: 20px;
  color: white;

  font-family: 'Marvel';
}

.description {
  font-size: 10px;
  text-align: justify;

  color: var(--vt-c-white-mute);
}
.creators-wrapper {
  text-align: center;
  margin-top: 4px;
  font-size: 10px;
  font-weight: bold;
  color: white;
}
</style>
