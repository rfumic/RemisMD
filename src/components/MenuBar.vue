<template>
  <div class="container">
    <div class="menu">
      <div>~</div>
      <div class="menu-item">New</div>
      <div class="menu-item">Save</div>
      <div class="menu-item">Save As</div>
      <div class="menu-item">Undo</div>
      <div class="menu-item">Redo</div>
      <div class="menu-item">Zoom in</div>
      <div class="menu-item">Zoom out</div>
    </div>
    <div class="title">MyFile.MD - markdown-editor</div>
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
  }
}
</script>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.container {
  display: flex;
  width: 100vw;
  height: 40px;
  padding-top: 0;
  align-items: center;
  justify-content: space-between;
  color: $c-tab-title-inactive;
  -webkit-user-select: none;
  -webkit-app-region: drag;

  .menu,
  .title,
  .windowControls {
    flex: 1;
  }
}
.menu {
  font-size: 1em;
  display: flex;
  align-items: center;
  //   background-color: green;
  justify-content: space-evenly;
}

.menu-item {
  cursor: default;
  padding: 0.2rem;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: $c-editor;
    border-radius: 0.5em;
    color: $c-foreground;
  }
}

.title {
  //   margin: 0 auto;

  //   background-color: red;
  display: flex;
  justify-content: center;
}
.windowControls {
  //   background-color: blue;
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
