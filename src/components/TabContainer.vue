<template>
  <div class="main">
    <div class="tabContainer">
      <div
        class="tabElement"
        draggable="true"
        v-if="props.tabs"
        v-for="tab in props.tabs"
        :key="tab.id"
        :class="tab.id == props.currentTab ? 'activeTab' : 'inactiveTab'"
        @click="$emit('setCurrentTab', tab.id)"
      >
        {{ tab.name }}
        <div
          class="loading"
          v-if="props.saving && tab.id == props.currentTab"
        ></div>
        <div class="unsaved" v-if="!props.saving && tab.unsaved"></div>
        <svg
          v-if="!props.saving"
          viewBox="0 0 24 24"
          width="23"
          height="23"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="closeIcon"
          @click.stop="$emit('closeTab', tab.id)"
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
const props = defineProps(['tabs', 'currentTab', 'saving']);
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.main {
  display: flex;
  flex-direction: row;
  font-size: 16px;
}
.tabContainer {
  background-color: $c-background;
  display: flex;
  align-items: center;
  min-height: 3rem;
}
.empty {
  flex-grow: 1;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
}
.tabElement {
  display: flex;
  align-items: center;
  padding: 1em;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
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

.unsaved {
  display: flex;
  justify-content: center;
  margin-left: 5px;
  content: '';
  width: 5px;
  height: 5px;
  border: 5px solid $c-foreground;
  border-radius: 50%;
}

.loading {
  display: flex;
  justify-content: center;
  margin-left: 15px;

  &::after {
    content: '';
    width: 5px;
    height: 5px;
    border: 5px solid $c-tab-title-active;
    border-top-color: $c-background;
    border-radius: 50%;
    animation: loading 1s linear infinite;
  }
}

@keyframes loading {
  to {
    transform: rotate(1turn);
  }
}
</style>
