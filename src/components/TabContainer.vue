<template>
  <div class="main">
    <div class="tabContainer">
      <div
        class="tabElement"
        v-for="tab in tabs"
        :key="tab.id"
        :class="tab.id == currentTab ? 'activeTab' : 'inactiveTab'"
        @click="currentTab = tab.id"
      >
        {{ tab.title }}
        <svg
          viewBox="0 0 24 24"
          width="23"
          height="23"
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
    <div class="empty"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const tabs = ref([
  { id: 1, title: 'File1sdfsdf.md' },
  { id: 2, title: 'File2.md' },
  { id: 3, title: 'File3.md' },
  { id: 4, title: 'File4.md' },
]);

let currentTab = ref(tabs.value[0].id);
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.main {
  display: flex;
  flex-direction: row;
}
.tabContainer {
  background-color: $c-background;
  display: flex;
  align-items: center;
  min-height: 3rem;
}
.empty {
  flex-grow: 1;
  border-bottom: 1px solid black;
}
.tabElement {
  display: flex;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
  color: $c-tab-title-active;
  background-color: $c-editor;
  cursor: pointer;
  transition: 50ms ease-in-out;
  &:hover {
    background-color: $c-editor;
  }
}
.activeTab {
  color: $c-tab-title-active;
  background-color: $c-editor;
  border-bottom: 1px solid $c-editor;
}
.inactiveTab {
  color: $c-tab-title-inactive;
  background-color: $c-background;
}

.closeIcon {
  margin-left: 0.5em;
  border-radius: 100%;
  transition: 70ms ease-in-out;
  &:hover {
    background-color: $c-text-area-border;
    color: $c-tab-title-inactive;
  }
}
</style>
