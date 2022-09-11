<template>
  <div class="bg" v-if="loaded">
    <div class="modal">
      <h1>Settings</h1>
      <h2>Theme</h2>
      <div class="selectTheme">
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
      <h2>Window settings</h2>
      <div class="windowSettings">
        <label class="form-control">
          <input
            type="checkbox"
            name="checkbox"
            :checked="settings.rememberWindowSize"
            @click="
              updateSettings('rememberWindowSize', !settings.rememberWindowSize)
            "
          />
          Remember window size
        </label>
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
let allThemes = ref([]);
let currentTheme = ref(null);
let settings = ref(true);
let loaded = ref(false);

async function getCurrentTheme() {
  currentTheme.value = await window.electronAPI.getCurrentTheme();
}

async function setAll() {
  try {
    allThemes.value = await window.electronAPI.getAllThemes();
    settings.value = await window.electronAPI.getAllSettings();
    await getCurrentTheme();
  } catch (error) {
    console.error(error);
  }
}

function openConfig() {
  window.electronAPI.openConfig();
}

async function updateSettings(setting, value) {
  try {
    await window.electronAPI.updateSettings(setting, value);
    await setAll();
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await setAll();
  loaded.value = true;
});
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

.form-control {
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  margin: 10px;
  font-size: 1.15rem;
}

input[type='checkbox'] {
  appearance: none;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);

  display: grid;
  place-content: center;

  &:checked {
    content: '';
    background-color: var(--highlight);
  }
}
</style>
