<script lang="ts" setup>
import { cn } from "~/lib/utils";

interface SpacingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xlg" | "2xl" | "3xl"
}

const props = defineProps<SpacingProps>()

let spacingClass: string

switch (props.size) {
  case "lg":
    spacingClass = "space-y-4"
    break;

  case "md":
  default:
    spacingClass = "space-y-2"
    break;
}
</script>

<template>
  <div
    :class="cn(spacingClass)"
  >
    <slot />
  </div>
</template>
