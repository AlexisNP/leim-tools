<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import {
  DropdownMenuSubTrigger,
  type DropdownMenuSubTriggerProps,
  useForwardProps
} from "radix-vue"
import { cn } from "@/lib/utils"
import { PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes["class"], arrowDirection?: "left" | "right" }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent',
        props.class
      )
    "
  >
    <template v-if="props.arrowDirection === 'left'">
      <PhCaretLeft class="mr-auto h-4 w-4" />

      <span class="inline-block">
        <slot />
      </span>
    </template>
    <template v-else>
      <slot />

      <PhCaretRight class="ml-auto h-4 w-4" />
    </template>
  </DropdownMenuSubTrigger>
</template>
