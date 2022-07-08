<template>
  <textarea
    v-model="textArea"
    cols="30"
    rows="2"
    autocomplete="off"
    wrap="hard"
    @input="resizeTextArea"
    ref="controlTextArea"
  ></textarea>
</template>
<script setup>
import { ref } from 'vue';

let textArea = ref('');
let controlTextArea = ref(null);

function resizeTextArea() {
  controlTextArea.value.style.height = '18px';
  controlTextArea.value.style.height =
    controlTextArea.value.scrollHeight + 'px';
}
</script>
<style lang="scss">
@use '@/scss/colors.scss' as *;
textarea {
  width: 25%;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  padding: 0.5rem;
  color: $c-foreground;
  background-color: $c-text-area;
  border: solid 2px $c-text-area-border;
  outline: none;
  resize: none;
  overflow: hidden;
}
</style>
