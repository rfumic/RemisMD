<template>
  <router-view> </router-view>
</template>

<script setup></script>
<style lang="scss">
@use '@/scss/colors.scss' as *;
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  overflow: hidden;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  background-color: $c-background;
}
</style>
