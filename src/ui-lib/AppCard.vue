<script setup lang="ts">
import { TiAppCard } from "@/types";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<Partial<TiAppCard>>(), {
  type: "default",
});

const { type } = toRefs(props);

const classObject = computed(() => ({
  default: type.value === "default",
  error: type.value === "error",
}));
</script>

<template>
  <div class="app-card" :class="classObject">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.app-card {
  padding: 8px;
  border-radius: 4px;

  transition: background-color 0.3s linear;

  &.default {
    background-color: var(--color-light-gray);
  }

  &.error {
    background-color: var(--color-error);
  }
}
</style>
