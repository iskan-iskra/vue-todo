<script setup lang="ts">
import { TiAppInput } from "@/types";
import { toRefs } from "vue";

const modelValue = defineModel<string>();

const props = defineProps<Partial<TiAppInput>>();

const { title, disabled, placeholder } = toRefs(props);
</script>

<template>
  <div class="app-input">
    <div v-if="title" class="app-input__title">{{ title }}</div>
    <input
      type="text"
      v-model="modelValue"
      class="app-input__input"
      :placeholder
      :disabled
    />
  </div>
</template>

<style scoped lang="scss">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &__title {
    color: var(--color-dark-gray);
    text-transform: uppercase;
    font-size: 10px;
    line-height: 14px;
  }

  &__input {
    border: 1px solid var(--color-border);
    outline: none;
    border-radius: 4px;
    padding: 6px;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;

    &::placeholder {
      font-weight: 500;
      font-size: 16px;
      color: var(--color-dark-gray);
    }

    &:disabled {
      cursor: not-allowed;
      background-color: var(--color-light-gray);
    }
  }
}
</style>
