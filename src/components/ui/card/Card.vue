<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  class?: HTMLAttributes['class']
  link?: string
}>()
</script>

<template>
  <div
    :class="
      cn('rounded-lg border bg-card text-card-foreground shadow-sm transition-all', props.class, {
        'relative outline outline-2 outline-offset-4 outline-transparent hover:bg-sky-950 hover:-translate-y-[.2rem] focus-within:outline-sky-900':
          props.link
      })
    "
  >
    <slot />

    <RouterLink
      v-if="props.link"
      :to="props.link"
      class="absolute inset-0 focus-visible:outline-none"
    />
  </div>
</template>
