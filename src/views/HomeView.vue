<template>
  <h1>{{ title }}</h1>
  <EditorComponent />
</template>

<script setup>
import EditorComponent from '@/components/EditorComponent.vue';
const title = 'Markdown Editor';
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
h1 {
  color: $c-foreground;
}
</style>
