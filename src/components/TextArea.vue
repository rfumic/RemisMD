<template>
  <textarea
    v-if="editMode"
    v-model="lineValue"
    cols="30"
    :rows="rowNumber"
    autocomplete="off"
    ref="controlTextArea"
    wrap="hard"
  ></textarea>
  <div v-else v-html="renderLine" @click="editMode = true" class="render"></div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { marked } from 'marked';
const props = defineProps(['line']);

const renderLine = computed(() => marked.parse(lineValue.value));
const rowNumber = computed(() => lineValue.value.split(/\r\n|\r|\n/).length);
let lineValue = ref(props.line);

let textArea = ref('');
let controlTextArea = ref(null);
let editMode = ref(false);

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
.render {
  ul,
  ol {
    margin-left: 50px;
  }
}
</style>
