<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import {
  DialogClose
} from "reka-ui"
import { PhX } from "@phosphor-icons/vue";

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="sheet-header"
    :class="cn('flex flex-col gap-1.5 p-4', props.class)"
  >
    <slot />

    <DialogClose
      class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 disabled:pointer-events-none"
      as-child
    >
      <UiButton
        size="icon"
        variant="outline"
        class="size-7 border-border bg-background hover:bg-secondary hover:text-secondary-foreground"
      >
        <PhX size="14" />
        <span class="sr-only">{{ $t('ui.actions.close') }}</span>
      </UiButton>
    </DialogClose>
  </div>
</template>
