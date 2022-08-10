<template>
  <div class="bg">
    <div class="modal">
      <h1>Settings</h1>
      <h2>Theme</h2>
      <div class="selectTheme">
        <!-- <div class="theme selectedTheme">DefaultDark</div> -->
        <div
          class="theme"
          v-for="(theme, name) in allThemes"
          :key="theme"
          :class="{ selectedTheme: currentTheme.theme == name }"
          @click="
            setAll();
            $emit('setCurrentTheme', [theme, name]);
          "
        >
          {{ name }}
        </div>
      </div>
      <a class="openConfig" @click="openConfig" title="Create custom themes"
        >Open config.json</a
      >
      <div class="buttons">
        <button @click="$emit('closeModal')">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
let allThemes = ref(null);
let currentTheme = ref(null);

async function getCurrentTheme() {
  currentTheme.value = await window.electronAPI.getCurrentTheme();
}

async function setAll() {
  try {
    allThemes.value = await window.electronAPI.getAllThemes();
    await getCurrentTheme();
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await setAll();
});
function openConfig() {
  window.electronAPI.openConfig();
}
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--foreground);
}
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  padding: 40px;

  width: 700px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}
.selectTheme {
  border: 1px solid var(--foreground);
  padding: 10px;
  margin: 10px;
  width: 100%;
  text-align: right;
  min-height: 5vh;
  max-height: 15vh;
  overflow: auto;
}
.theme {
  cursor: pointer;
  padding: 2px;
  &:hover {
    background: var(--highlight);
    color: var(--background);
  }
}
.selectedTheme {
  text-decoration: underline;
  color: var(--highlight);
}
h1 {
  padding-bottom: 20px;
}
.openConfig {
  cursor: pointer;
  color: var(--textActive);
  &:hover {
    color: var(--foreground);
  }
  padding: 3px;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
button {
  cursor: pointer;
  padding: 10px;
  background-color: var(--background);
  border: 1px solid var(--textActive);
  border-radius: 5px;
  width: 100px;
  color: var(--textActive);
  &:hover {
    border: 1px solid var(--foreground);
    color: var(--foreground);
  }
}
</style>
