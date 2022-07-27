<template>
  <menu-bar
    @openFile="handleOpenFile"
    @saveFile="handleSaveFile"
    @newFile="handleNewFile"
    :windowTitle="currentTab.name"
  />

  <tab-container
    :tabs="files"
    :currentTab="currentTab.id"
    @closeTab="closeTab"
    @setCurrentTab="setCurrentTab"
  />
  <editor-component
    v-if="showEditor"
    :file="currentTab"
    :reset="resetEditor"
    @save-file="handleSaveFile"
  />
  <default-screen @open-file="handleOpenFile" @new-file="handleNewFile" />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { marked } from 'marked';
import TurndownService from 'turndown';

import DefaultScreen from '@/components/DefaultScreen.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import TabContainer from '@/components/TabContainer.vue';
import MenuBar from '@/components/MenuBar.vue';

const store = useStore();

const showEditor = computed(() => files.value.length !== 0);
const currentTab = ref({ name: 'Open a file' });
const files = ref([
  // { id: 1, title: 'File1sdfsdf.md' },
  // { id: 2, title: 'File2.md' },
  // { id: 3, title: 'File3.md' },
  // { id: 4, title: 'File4.md' },
]);
const resetEditor = ref(false);
let fileHandle;

watch(currentTab, (x, y) => {
  console.log('HERE:', x);
  resetEditor.value = !resetEditor.value;
});

function setCurrentTab(tabId) {
  currentTab.value = files.value.find((file) => file.id === tabId);
  console.log('this is the tab id:', tabId);
}

function closeTab(payload) {
  files.value = files.value.filter((file) => file.id !== payload);
  currentTab.value = files.value[files.value.length - 1] || {
    name: 'Open a file',
  };
}

async function handleOpenFile() {
  try {
    [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Markdown',
          accept: {
            'markdown/*': ['.MD', '.markdown'],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    let fileData = await fileHandle.getFile();
    let content = await fileData.text();
    let data = {
      id: Date.now(),
      name: fileData.name,
      content: parseFile(content),
      fileHandle,
    };
    files.value.push(data);
    store.commit('addFile', data);
    console.log(files.value[files.value.length - 1]);
    currentTab.value = files.value[files.value.length - 1];
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }
}

async function handleSaveFile() {
  try {
    const file = store.getters.getFile(currentTab.value.id);
    await file.fileHandle.requestPermission();
    let stream = await file.fileHandle.createWritable();
    await stream.write({ data: file.content.join('\r\n\n'), type: 'write' });
    await stream.close();
  } catch (error) {
    console.error(error);
  }
}

async function handleNewFile() {
  try {
    fileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: 'Markdown',
          accept: {
            'markdown/*': ['.MD', '.markdown'],
          },
        },
      ],
      excludeAcceptAllOption: true,
    });
    let fileData = await fileHandle.getFile();
    let data = {
      id: Date.now(),
      name: fileData.name,
      content: [],
      fileHandle,
    };

    files.value.push(data);
    store.commit('addFile', data);
    currentTab.value = files.value[files.value.length - 1];
    let stream = await fileHandle.createWritable();
    await stream.write({ data: '', type: 'write' });
    await stream.close();
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }
}

async function verifyPermission(fileHandle, withWrite) {
  const opts = {};
  if (withWrite) {
    opts.mode = 'readwrite';
  }

  // Check if we already have permission, if so, return true.
  if ((await fileHandle.queryPermission(opts)) === 'granted') {
    return true;
  }

  // Request permission to the file, if the user grants permission, return true.
  if ((await fileHandle.requestPermission(opts)) === 'granted') {
    return true;
  }

  // The user did not grant permission, return false.
  return false;
}

function parseFile(fileContent) {
  const td = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });
  const initialHtml = marked.parse(fileContent);

  const doc = new DOMParser().parseFromString(initialHtml, 'text/html');
  return [...doc.body.children].map((child) => td.turndown(child.outerHTML));
}
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
</style>
