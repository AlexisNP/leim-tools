<script lang="ts" setup>
import { cn } from "@/lib/utils";
import { type RPGColor, rpgColors } from "~/models/Color";

defineProps<{
  id: string
}>();

const model = defineModel<RPGColor>({ default: "white" });
</script>

<template>
  <UiSelect v-model="model">
    <UiSelectTrigger :id>
      <UiSelectValue
        :placeholder="$t('ui.colors.selectOne')"
        class="input-color"
        :class="
          cn(
            `input-color-${model}`,
          )
        "
      />
    </UiSelectTrigger>
    <UiSelectContent position="popper">
      <UiSelectGroup>
        <UiSelectItem
          v-for="color in rpgColors"
          :key="color"
          :value="color"
          class="input-color"
          :class="
            cn(
              `input-color-${color}`,
            )
          "
        >
          {{ $t(`ui.colors.${color}`) }}
        </UiSelectItem>
      </UiSelectGroup>
    </UiSelectContent>
  </UiSelect>
</template>

<style lang="scss" scoped>
.input-color {
  &::before {
    content: "";
    display: inline-block;
    width: .75rem;
    aspect-ratio: 1;
    margin-right: 0.5em;
    border-radius: .25rem;
    background-color: red;
    border: 1px solid transparent;
  }

  &.input-color-red::before {
    @apply bg-red-500;
  }
  &.input-color-orange::before {
    @apply bg-orange-500;
  }
  &.input-color-amber::before {
    @apply bg-amber-500;
  }
  &.input-color-yellow::before {
    @apply bg-yellow-500;
  }
  &.input-color-lime::before {
    @apply bg-lime-500;
  }
  &.input-color-green::before {
    @apply bg-green-500;
  }
  &.input-color-emerald::before {
    @apply bg-emerald-600;
  }
  &.input-color-teal::before {
    @apply bg-teal-600;
  }
  &.input-color-cyan::before {
    @apply bg-cyan-600;
  }
  &.input-color-sky::before {
    @apply bg-sky-600;
  }
  &.input-color-blue::before {
    @apply bg-blue-600;
  }
  &.input-color-indigo::before {
    @apply bg-indigo-600;
  }
  &.input-color-violet::before {
    @apply bg-violet-600;
  }
  &.input-color-purple::before {
    @apply bg-purple-600;
  }
  &.input-color-fuchsia::before {
    @apply bg-fuchsia-600;
  }
  &.input-color-pink::before {
    @apply bg-pink-600;
  }
  &.input-color-rose::before {
    @apply bg-rose-600;
  }
  &.input-color-black::before {
    @apply bg-black dark:border-[1px] dark:border-slate-300;
  }
  &.input-color-white::before {
    @apply bg-white border-[1px] border-slate-700;
  }
}
</style>
