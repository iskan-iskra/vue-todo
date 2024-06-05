<script setup lang="ts">
import { checkboxSvg } from "@/assets";
import { TiAppCheckbox } from "@/types";
import { computed, toRefs } from "vue";

const props = defineProps<Partial<TiAppCheckbox>>();

const { checked, disabled } = toRefs(props);

const classObject = computed(() => ({
  checked: checked.value,
  disabled: disabled.value,
}));
</script>

<template>
  <label class="app-checkbox" :class="classObject">
    <input type="checkbox" :checked :disabled />
    <img v-if="checked || disabled" :src="checkboxSvg" />
  </label>
</template>

<style scoped lang="scss">
.app-checkbox {
  width: 11px;
  height: 11px;
  border-radius: 2px;
  position: relative;
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  transition: background-color 0.2s linear;
  cursor: pointer;
  user-select: none;

  &.checked {
    background-color: var(--color-primary);
  }

  &.disabled {
    cursor: not-allowed;
    background-color: var(--color-disabled);
  }

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 1px;
  }

  & > input {
    display: none;
  }
}
</style>
