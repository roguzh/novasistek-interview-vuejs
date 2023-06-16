<script setup lang="ts">
import '@/assets/fonts/fonts.css'
import { useStore } from 'vuex'

const store = useStore()

const DUMP_USER = {
  username: 'Del Ferro'
}
</script>

<template>
  <header class="header">
    <div class="logo">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
    </div>
    <div class="user-info">
      <div id="favourite-count-wrapper" @click="store.commit('changeToggleFavourites')">
        <span>{{ store.state.favouriteComics.length }}</span>
        <img alt="Favourite Badge" src="@/assets/icons/filled_star.png" />
      </div>
      {{ DUMP_USER.username }}
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;

  width: 100%;
  position: relative;

  background: var(--vt-c-black-mute);

  font-family: 'Roboto';
}

.logo {
  flex: 1;
  height: 56px;
  text-align: center;
}

.logo img {
  width: auto;
}

.user-info {
  position: absolute;
  right: 48px;

  font-size: 18px;
  color: var(--vt-c-white-soft);

  height: 100%;
  display: flex;
  align-items: center;

  #favourite-count-wrapper {
    margin: 0 10px;
    padding: 2px 8px;

    background: var(--vt-c-white-soft);
    color: var(--vt-c-black-mute);

    display: flex;
    align-items: center;

    border-radius: 8px;

    line-height: 2;

    cursor: pointer;
    img {
      height: 18px;
      width: 18px;
    }

    span {
      line-height: 1.7;
      margin-top: 2px;
      margin-right: 4px;
    }
  }
}

@media (max-width: 927px) {
  .logo img {
    position: absolute;
    left: 0;
  }
  .user-info {
    position: absolute;
    right: 16px;
  }
}
</style>
