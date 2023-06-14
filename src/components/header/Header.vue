<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="logo">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg"/>
    </div>
    <div class="user-info">
      USERNAME
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:  0 48px;

  width: 100%;
  position: relative;

  background: var(--vt-c-black-mute);
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
}

@media (min-width: 1024px) {
}
</style>
