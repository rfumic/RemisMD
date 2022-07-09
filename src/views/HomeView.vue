<template>
  <TabContainer />
  <EditorComponent />
</template>

<script setup>
import EditorComponent from '@/components/EditorComponent.vue';
import TabContainer from '@/components/TabContainer.vue';
const title = 'Markdown Editor';
</script>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
h1 {
  color: $c-foreground;
}
</style>
