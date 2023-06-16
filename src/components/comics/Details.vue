<script setup lang="ts">
import type { Comic } from '@/types/types'
import { type Ref, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps<{
  comic: Comic | null
}>()

const comic: Ref<Comic | null> = ref(props.comic)

const closeDetailedComics = () => {
  if (store.state.selectedComic) {
    store.commit('setSelectedComic', null)
  }
}

const getCreatorRole = (role: string) => {
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1)

  return capitalizedRole.charAt(0) != '(' ||
    capitalizedRole.charAt(capitalizedRole.length - 1) != ')'
    ? `(${capitalizedRole})`
    : capitalizedRole
}

const setFavourite = ($event: MouseEvent) => {
  $event.stopPropagation()
  if (comic.value) store.commit('changeComicFavState', comic.value.id)
}
</script>

<template>
  <div class="container" @click="closeDetailedComics">
    <div
      :class="'detailed-comic-wrapper ' + `${props.comic ? 'bounceIn' : ''}`"
      v-if="comic != null"
      @click="$event.stopPropagation()"
    >
      <div class="section-wrapper">
        <div class="section thumbnail">
          <img
            :src="`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`"
            alt="Comic's Thumbnail"
          />
        </div>
        <div class="section details-section">
          <div class="title">{{ comic.title }}</div>
          <div class="description" v-if="comic.description && comic.description != `#N/A`">
            <span class="detail-title">Description</span><br />
            {{ comic.description }}
          </div>
          <div class="section-wrapper inner">
            <div class="section creators" v-if="comic && comic.creators.items.length > 0">
              <span class="detail-title">Creators</span><br />
              <p v-for="creator in comic.creators.items" :key="creator.name">
                • {{ creator.name }}
                <span class="muted">{{ getCreatorRole(creator.role) }}</span>
              </p>
            </div>
            <div class="section characters" v-if="comic && comic.characters.items.length > 0">
              <span class="detail-title">Characters</span><br />
              <p v-for="character in comic.characters.items" :key="character.name">
                • {{ character.name }}
              </p>
            </div>
          </div>
        </div>
        <div class="section" style="max-height: 56px">
          <div
            :class="
              'custom-button ' + (comic && store.getters.isComicFav(comic.id) ? 'fav' : 'unfav')
            "
            @click="setFavourite"
          >
            {{
              comic && store.getters.isComicFav(comic.id) ? 'REMOVE FAVOURITE' : 'ADD TO FAVOURITES'
            }}
          </div>
        </div>
        <div class="section" style="max-height: 56px">
          <div class="custom-button light" @click="closeDetailedComics">CLOSE</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/animations.css';
.container {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(40, 40, 40, 0.9);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(40, 40, 40, 0.4);

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
.detailed-comic-wrapper {
  max-width: calc(1480px - 512px);
  max-height: 100%;
  padding: 12px 12px;

  margin: 12px 12px;

  border-radius: 8px;
  color: var(--vt-c-white);

  background: var(--vt-c-black-mute);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(40, 40, 40, 0.4);

  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

.muted {
  opacity: 0.7;
  font-size: 14px;
}

.title {
  font-size: 22px;
  font-weight: 600;
  color: white;
  filter: drop-shadow(0px 0px 1px #000000cc);
  text-align: center;
}

.detail-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.description {
  text-align: justify;
  color: var(--vt-c-white-mute);
}

.section-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.section {
  flex-basis: 50%;
  flex: 1 50%;

  padding: 12px;
}

.details-section {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.thumbnail {
  justify-content: center;
  align-items: center;
  display: flex;

  img {
    border-radius: 8px;
    height: 670px;
    width: 447px;
  }
}

.custom-button {
  text-align: center;
  font-weight: 600;

  padding: 8px 0;
  border-radius: 8px;

  width: 80%;
  margin-left: 10%;
  margin-top: 4px;
  margin-bottom: 4px;

  cursor: pointer;

  &:hover {
    width: 96%;
    margin-left: 2%;
    transition: 0.66s;
  }
}

.custom-button.unfav {
  background: var(--marvel-red);
  border: 1px solid var(--vt-c-black);
  color: var(--vt-c-white);
}

.custom-button.fav {
  background: var(--vt-c-black);
  border: 1px solid var(--vt-c-black);
  color: var(--vt-c-white);
}

.custom-button.light {
  background: var(--vt-c-white);
  border: 1px solid var(--vt-c-black);
  color: var(--vt-c-black);
}

@media (max-width: 1038px) {
  .section-wrapper {
    flex-direction: column;
  }

  .section-wrapper.inner {
    flex-direction: row;
  }
}

@media (max-width: 534px) {
  .thumbnail {

    img {
      height: 480px;
      width: 320px;
    }
  }
}

@media (max-width: 398px) {
  .thumbnail {

    img {
      height: 330px;
      width: 220px;
    }
  }
}
</style>
