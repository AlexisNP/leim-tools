<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  link?: string
  hasClick?: boolean
}>()

const emit = defineEmits(["on-click"])
</script>

<template>
  <div
    :class="
      cn('rounded-lg border bg-card text-card-foreground shadow-sm transition-all isolate', props.class, {
        'relative outline outline-2 outline-offset-4 outline-transparent hover:-translate-y-[.2rem]':
          props.link || props.hasClick
      })
    "
  >
    <slot />

    <NuxtLink
      v-if="props.link"
      :to="props.link"
      class="absolute inset-0 z-10 focus-visible:outline-none"
    />
    <button
      v-if="props.hasClick"
      class="absolute inset-0 z-10 focus-visible:outline-none"
      @click="emit('on-click')" />
  </div>
</template>
