<template>
  <!-- <router-view> </router-view> -->
  <HomeView />
</template>

<script setup>
import HomeView from './views/HomeView.vue';
</script>
<style lang="scss">
@use '@/scss/colors.scss' as *;
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
:root {
  --testColor: pink;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
body {
  overflow: hidden;
}
#app {
  width: 100vw;
  height: 100vh;

  background-color: $c-background;
}
</style>
