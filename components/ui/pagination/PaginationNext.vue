<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { PaginationNext, type PaginationNextProps } from "radix-vue"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { PhCaretRight } from "@phosphor-icons/vue"

const props = withDefaults(
  defineProps<PaginationNextProps & { class?: HTMLAttributes["class"] }>(),
  {
    asChild: true
  }
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationNext v-bind="delegatedProps">
    <Button :class="cn('size-10 p-0', props.class)" variant="outline">
      <slot>
        <PhCaretRight class="size-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
