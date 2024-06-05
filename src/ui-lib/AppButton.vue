<script setup lang="ts">
import { closeSvg } from "@/assets";
import { TiAppButton } from "@/types";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<Partial<TiAppButton>>(), {
  type: "default",
  icon: undefined,
  disabled: false,
  textCase: "upper",
});

const { type, icon, disabled, textCase } = toRefs(props);

const listOfButtonTypesWithText: TiAppButton["type"][] = ["default"];

const isSlotAvailable = computed<boolean>(() =>
  listOfButtonTypesWithText.includes(type.value)
);

const iconMap: Record<TiAppButton["icon"], any> = {
  close: closeSvg,
};

const iconComponent = computed<string | undefined>(() =>
  icon.value ? iconMap[icon.value] : undefined
);

const classObject = computed<Record<string, boolean>>(() => ({
  "type--default": type.value === "default",
  "type--icon": type.value === "icon",
  "text-case--default": textCase.value === "default",
  "text-case--lower": textCase.value === "lower",
  "text-case--upper": textCase.value === "upper",
}));
</script>

<template>
  <button class="app-button" :class="classObject" :disabled>
    <slot v-if="isSlotAvailable"></slot>
    <img v-if="iconComponent && type === 'icon'" :src="iconComponent" />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  border: none;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 2px;
  transition: all 0.2s linear;
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
  height: 30px;
  cursor: pointer;
  user-select: none;

  &.type {
    &--default {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
    &--icon {
      background-color: var(--color-primary);
      color: var(--color-white);

      img {
        width: 22px;
        height: 22px;
        fill: var(--color-white);
      }
    }
  }

  &.text-case {
    &--default {
      text-transform: none;
    }
    &--lower {
      text-transform: lowercase;
    }
    &--upper {
      text-transform: uppercase;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-disabled);
  }
}
</style>
