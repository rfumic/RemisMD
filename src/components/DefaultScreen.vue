<template>
  <div class="container">
    <div class="box" @click="$emit('newFile')">
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
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        ></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
      <p>Create new file</p>
    </div>
    <div class="box" @click="$emit('openFile')">
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
      >
        <path
          d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
        ></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
      <p>Open existing file</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/scss/colors.scss' as *;

.container {
  display: flex;
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
  color: $c-tab-title-inactive;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  cursor: pointer;
  font-size: 25px;
  transition: 150ms ease-in-out;
  &:hover {
    color: $c-foreground;
  }
}
</style>
