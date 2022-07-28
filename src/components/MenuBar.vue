<template>
  <div class="container">
    <div class="menu">
      <div>~</div>
      <div class="menu-item" title="New File">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-file-plus"
          @click="$emit('newFile')"
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
          ></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="15" y2="15"></line>
        </svg>
      </div>
      <div class="menu-item" title="Open File">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-file"
          @click="$emit('openFile')"
        >
          <path
            d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
          ></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      </div>
      <div class="menu-item" title="Save">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-save"
          @click="$emit('saveFile')"
        >
          <path
            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
          ></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
      </div>
      <!-- <div class="menu-item" title="Save as">Save As</div> -->
      <div class="menu-item" title="Undo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-corner-up-left"
          @click="handleControl('undo')"
        >
          <polyline points="9 14 4 9 9 4"></polyline>
          <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
        </svg>
      </div>
      <div class="menu-item" title="Redo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-corner-up-right"
          @click="handleControl('redo')"
        >
          <polyline points="15 14 20 9 15 4"></polyline>
          <path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>
        </svg>
      </div>
      <div class="menu-item" title="Zoom in">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-zoom-in"
          @click="handleControl('zoomIn')"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <div class="menu-item" title="Zoom out">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-zoom-out"
          @click="handleControl('zoomOut')"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
      <div class="menu-item" title="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="title">{{ props.windowTitle }} - markdown-editor</div>
    <div class="windowControls">
      <div @click="handleControl('minimize')" title="Minimize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-minus"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </div>
      <div @click="handleControl('maximize')" title="Maximize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-square"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        </svg>
      </div>
      <div @click="handleControl('close')" title="Close">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="closeIcon"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
let openFile = ref({});
const props = defineProps(['windowTitle']);

// const title = computed(() => props.windowTitle);

function handleControl(control) {
  switch (control) {
    case 'close':
      window.electronAPI.closeApp();
      break;
    case 'minimize':
      window.electronAPI.minimizeApp();
      break;
    case 'maximize':
      window.electronAPI.maximizeApp();
      break;

    case 'zoomIn':
      window.electronAPI.zoomIn();
      break;
    case 'zoomOut':
      window.electronAPI.zoomOut();
      break;
    case 'undo':
      window.electronAPI.undo();
      break;
    case 'redo':
      window.electronAPI.redo();
      break;
  }
}
async function handleFileUpload() {
  let [fileHandle] = await window.showOpenFilePicker({
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
  openFile.value.content = await fileData.text();
  openFile.value.name = fileData.name;
  console.log(openFile.value.content);
  console.log(openFile.value.name);
  console.log(fileData);
}
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.container {
  display: flex;
  width: 100%;
  height: 40px;
  min-width: 100%;
  max-width: 100%;
  line-height: 40px;
  padding-top: 5px;
  align-items: center;
  justify-content: space-between;
  color: $c-tab-title-inactive;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .menu,
  .title,
  .windowControls {
    // flex: 1;
    // flex: 1 0 0;
  }
}
.menu {
  font-size: 15px;
  // max-width: 300px;
  display: flex;
  align-items: center;
  overflow: hidden;

  // background-color: green;
  justify-content: space-between;
}

.menu-item {
  cursor: default;
  padding: 0.2rem;
  // margin: 0 5px;
  -webkit-app-region: no-drag;
  &:hover {
    // background-color: $c-editor;
    border-radius: 0.5em;
    color: $c-foreground;
  }
}

.title {
  // margin: 0 auto;

  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.windowControls {
  // background-color: blue;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    -webkit-app-region: no-drag;
    svg {
      width: 30px;
      height: 20px;
    }
    padding: 0 5px;

    &:hover {
      color: $c-foreground;
    }
  }
}
</style>
