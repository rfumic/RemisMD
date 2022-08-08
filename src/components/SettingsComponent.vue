<template>
  <div class="bg">
    <div class="modal">
      <button @click="$emit('closeModal')">X</button>
      this is a modal
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: $c-foreground;
}
.modal {
  position: relative;
  display: flex;
  background-color: $c-background;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}
</style>
