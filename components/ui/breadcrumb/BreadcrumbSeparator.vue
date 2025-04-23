<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { cn } from "~/lib/utils"
import { PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <li
    role="presentation"
    aria-hidden="true"
    :class="cn('[&>svg]:w-3 [&>svg]:h-3', props.class)"
  >
    <slot>
      <PhCaretRight />
    </slot>
  </li>
</template>
