<template>
  <router-view> </router-view>
</template>

<script setup>
function setTheme(theme) {
  const root = document.querySelector(':root');
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--editor', theme.editor);
  root.style.setProperty('--foreground', theme.foreground);
  root.style.setProperty('--highlight', theme.highlight);
  root.style.setProperty('--textActive', theme.textActive);
  root.style.setProperty('--textArea', theme.textArea);
  root.style.setProperty('--textAreaBorder', theme.textAreaBorder);
  root.style.setProperty('--textInactive', theme.textInactive);
}
(async () => {
  let currentTheme = await window.electronAPI.getCurrentTheme();
  setTheme(currentTheme);
  console.log('hi from APP.VUE', currentTheme);
})();
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
