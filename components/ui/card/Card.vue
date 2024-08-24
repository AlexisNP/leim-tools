<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  link?: string
}>()
</script>

<template>
  <div
    :class="
      cn('rounded-lg border bg-card text-card-foreground shadow-sm transition-all isolate', props.class, {
        'relative outline outline-2 outline-offset-4 outline-transparent hover:-translate-y-[.2rem]':
          props.link
      })
    "
  >
    <slot />

    <NuxtLink
      v-if="props.link"
      :to="props.link"
      class="absolute inset-0 z-10 focus-visible:outline-none"
    />
  </div>
</template>
