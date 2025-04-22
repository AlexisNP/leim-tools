<script lang="ts" setup>
import type { PrimitiveProps } from "radix-vue"
import type { HTMLAttributes } from "vue"
import { cn } from "~/lib/utils"
import { Primitive } from "radix-vue"

const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "a",
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors rounded-[1px] hover:text-primary focus-visible:text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4', props.class)"
  >
    <slot />
  </Primitive>
</template>
