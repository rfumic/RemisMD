<template>
  <menu-bar
    @openFile="handleOpenFile"
    @saveFile="handleSaveFile"
    @newFile="handleNewFile"
    @settings="showModal = true"
    :windowTitle="currentTab.name"
  />

  <tab-container
    :tabs="files"
    :currentTab="currentTab.id"
    :saving="saving"
    @closeTab="closeTab"
    @setCurrentTab="setCurrentTab"
  />
  <editor-component
    v-if="showEditor"
    :file="currentTab"
    :reset="resetEditor"
    @save-file="handleSaveFile"
    @save-as="handleSaveAs"
    @changeUnsaved="changeUnsaved"
  />
  <default-screen @open-file="handleOpenFile" @new-file="handleNewFile" />
  <Teleport to="#modal">
    <settings
      v-if="showModal"
      @closeModal="showModal = false"
      @setCurrentTheme="setCurrentTheme"
    />
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { marked } from 'marked';
import TurndownService from 'turndown';
import { gfm } from 'joplin-turndown-plugin-gfm';

import DefaultScreen from '@/components/DefaultScreen.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import TabContainer from '@/components/TabContainer.vue';
import MenuBar from '@/components/MenuBar.vue';
import Settings from '@/components/SettingsComponent.vue';

const store = useStore();
const saving = ref(false);
const showEditor = computed(() => files.value.length !== 0);
const currentTab = ref({ name: 'Open a file' });
const showModal = ref(false);
const files = ref([
  // { id: 1, title: 'File1sdfsdf.md' },
  // { id: 2, title: 'File2.md' },
  // { id: 3, title: 'File3.md' },
  // { id: 4, title: 'File4.md' },
]);
const resetEditor = ref(false);

window.addEventListener('keyup', (key) => {
  if ((key.key === 'n' || key.key === 'N') && key.ctrlKey) {
    handleNewFile();
  }
  if ((key.key === 'o' || key.key === 'O') && key.ctrlKey) {
    handleOpenFile();
  }
});

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

function setCurrentTheme([theme, name]) {
  console.log('hello from homeview.vue', name);
  window.electronAPI.setCurrentTheme(name);
  setTheme(theme);
}

watch(currentTab, (x, y) => {
  console.log('HERE:', x);
  resetEditor.value = !resetEditor.value;
});

window.addEventListener('keyup', (key) => {
  if (key.key === ',' && key.ctrlKey) {
    showModal.value = true;
  }
});

function changeUnsaved(id, value) {
  console.log('itran', id, value);
  // files.value = files.value.map((file) => {
  //   if (file.id === id) {
  //     return {
  //       ...file,
  //       unsaved: value,
  //     };
  //   }
  // });
  for (let file of files.value) {
    if (file.id === id) {
      file.unsaved = value;
      console.log('this here:', file);
      return;
    }
  }
}

function setCurrentTab(tabId) {
  currentTab.value = files.value.find((file) => file.id === tabId);
  console.log('this is the tab id:', tabId);
}

function closeTab(payload) {
  files.value = files.value.filter((file) => file.id !== payload);
  store.commit('removeFile', { id: payload });
  currentTab.value = files.value[files.value.length - 1] || {
    name: 'Open a file',
  };
}

async function handleOpenFile() {
  try {
    let [name, content, path] = await window.electronAPI.openFile();
    let data = {
      id: Date.now(),
      name,
      content: parseFile(content),
      path,
      unsaved: false,
    };
    files.value.push(data);
    store.commit('addFile', { ...data });
    console.log(files.value[files.value.length - 1]);
    currentTab.value = files.value[files.value.length - 1];
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }
}

async function handleSaveFile() {
  // const file = currentTab.value;
  const file = store.getters.getFile(currentTab.value.id);
  try {
    changeUnsaved(file.id, false);
    saving.value = true;

    let [name, content, path] = await window.electronAPI.saveFile({
      path: file.path,
      content: file.content.join('\r\n\n'),
    });
    // const fileIndex = files.value.indexOf((f) => f.id === file.id);
    // files.value[fileIndex] = { ...files.value[fileIndex], name, content, path };
    // currentTab.value = files.value[fileIndex];
    saving.value = false;
    return [name, content, path];
  } catch (error) {
    console.error(error);
  }
}

async function handleSaveAs() {
  const file = store.getters.getFile(currentTab.value.id);
  try {
    let [name, content, path] = await window.electronAPI.saveFile({
      path: undefined,
      content: file.content.join('\r\n\n'),
    });
    let data = {
      name,
      content: parseFile(content),
      path,
      id: Date.now(),
      unsaved: false,
    };
    files.value.push(data);
    store.commit('addFile', data);
    currentTab.value = files.value[files.value.length - 1];
  } catch (error) {
    console.error(error);
  }
}

async function handleNewFile() {
  try {
    let data = {
      id: Date.now(),
      name: '𝘶𝘯𝘵𝘪𝘵𝘭𝘦𝘥',
      content: [],
      path: undefined,
      unsaved: true,
    };

    files.value.push(data);
    store.commit('addFile', data);
    currentTab.value = files.value[files.value.length - 1];
    // let stream = await fileHandle.createWritable();
    // await stream.write({ data: '', type: 'write' });
    // await stream.close();
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }
}

function parseFile(fileContent) {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });
  td.use(gfm);
  const initialHtml = marked.parse(fileContent);

  const doc = new DOMParser().parseFromString(initialHtml, 'text/html');
  return [...doc.body.children].map((child) => td.turndown(child.outerHTML));
}
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
</style>
