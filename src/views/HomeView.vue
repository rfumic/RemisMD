<template>
  <menu-bar @openFile="handleOpenFile" :windowTitle="currentTab.name" />

  <tab-container
    :tabs="files"
    :currentTab="currentTab.id"
    @closeTab="closeTab"
    @setCurrentTab="setCurrentTab"
  />
  <editor-component v-if="showEditor" :file="currentTab" :reset="resetEditor" />
  <default-screen @open-file="handleOpenFile" />
</template>

<script setup>
import { marked } from 'marked';
import TurndownService from 'turndown';

import DefaultScreen from '@/components/DefaultScreen.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import TabContainer from '@/components/TabContainer.vue';
import MenuBar from '@/components/MenuBar.vue';

import { ref, computed, watch } from 'vue';
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
    files.value.push({
      id: Date.now(),
      name: fileData.name,
      content: parseFile(content),
    });
    console.log(files.value[files.value.length - 1]);
    currentTab.value = files.value[files.value.length - 1];
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
  const initialHtml = marked.parse(fileContent);

  const doc = new DOMParser().parseFromString(initialHtml, 'text/html');
  return [...doc.body.children].map((child) => td.turndown(child.outerHTML));
}
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
</style>
