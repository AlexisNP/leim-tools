<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from "radix-vue"
import { cn } from "@/lib/utils"
import { PhCaretDown } from "@phosphor-icons/vue";

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background hover:bg-secondary hover:text-primary-foreground px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <PhCaretDown class="size-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
