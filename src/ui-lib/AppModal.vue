<script setup lang="ts">
const emit = defineEmits(["click-outside"]);
</script>

<template>
  <Teleport to="body">
    <div class="app-modal__wrapper" @click="emit('click-outside')">
      <div class="app-modal__container" @click.stop>
        <div class="app-modal__header">
          <slot name="header"></slot>
        </div>
        <div class="app-modal__body">
          <slot name="body"></slot>
        </div>
        <div class="app-modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.app-modal {
  &__wrapper {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-fade);
  }

  &__container {
    background-color: var(--color-white);
    border-radius: 6px;
    overflow: hidden;
  }

  &__header {
    padding: 10px;
    min-height: 40px;
  }

  &__body {
    padding: 0 30px;
  }

  &__footer {
    padding: 10px;
    min-height: 40px;
  }
}
</style>
