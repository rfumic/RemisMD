<template>
  <div v-if="editMode">
    <textarea
      v-model="lineValue"
      cols="30"
      :rows="rowNumber"
      :ref="controlTextArea"
      @input="$emit('update:modelValue', $event.target.value)"
      autocomplete="off"
      wrap="hard"
    ></textarea>
    <div class="textAreaControl">
      <div
        title="Add line above (Ctrl + Shift + Enter)"
        @click="$emit('addLineAbove')"
      >
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
          class="feather feather-chevron-up"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </div>
      <div title="Add line below (Ctrl + Enter)" @click="$emit('addLineBelow')">
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
          class="feather feather-chevron-down"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <div
        title="Remove line (Ctrl + Shift + Delete)"
        @click="$emit('removeLine')"
      >
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
          class="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path
            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
          ></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </div>
      <div title="Deselect line (Esc)" @click="$emit('deselectLine')">
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
          class="feather feather-x-square"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="15"></line>
          <line x1="15" y1="9" x2="9" y2="15"></line>
        </svg>
      </div>
    </div>
  </div>
  <div
    v-else
    v-html="renderLine"
    @click="$emit('selectLine')"
    class="render"
  ></div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { marked } from 'marked';
const props = defineProps(['line', 'isSelected', 'modelValue']);

const renderLine = computed(() => marked.parse(lineValue.value));
const rowNumber = computed(() => lineValue.value.split(/\r\n|\r|\n/).length);
let lineValue = ref(props.line);

let textArea = ref('');
let controlTextArea = ref(null);
let editMode = computed(() => props.isSelected);

watch(
  () => props.line,
  (newValue, oldValue) => {
    lineValue.value = newValue;
  }
);

function resizeTextArea() {
  controlTextArea.value.style.height = '5px';
  controlTextArea.value.style.height =
    controlTextArea.value.scrollHeight + 'px';
}
</script>
<style lang="scss">
@use '@/scss/colors.scss' as *;
textarea {
  width: 100%;
  // height: fit-content;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  padding: 16px 8px;
  color: $c-foreground;
  background-color: $c-text-area;
  border: solid 2px $c-text-area-border;
  outline: none;
  resize: none;
  overflow: hidden;
}
.textAreaControl {
  width: 100%;
  height: 50px;
  // background-color: blue;
  display: flex;
  align-items: center;
  p,
  div {
    margin-left: 25px;
    color: $c-foreground;
    &:hover {
      color: $c-text-area-border;
    }
  }
}
.render {
  ul,
  ol {
    margin-left: 50px;
  }
  &:hover {
    background-color: $c-background;
    transition: 60ms ease-in-out;
  }
}
pre {
  background-color: $c-background;
  padding: 4px;
  width: fit-content;
}

code {
  font-family: 'Roboto Mono', monospace;
  background-color: $c-background;
}

blockquote {
  margin: 8px;
  padding: 8px;
  border-left: 4px solid $c-highlight;
  &:hover {
    border-color: $c-tab-title-active;
  }
}

a {
  color: $c-highlight;
  font-weight: bolder;
}

table {
  border: 1px solid $c-foreground;
  border-collapse: collapse;
}
tr,
td,
th {
  margin: 1px;
  padding: 8px;
  border: 1px solid $c-foreground;
}
th {
  background-color: $c-foreground;
  color: $c-background;
  border: 1px dotted $c-background;
}
</style>
