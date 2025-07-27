<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { PaginationPrev, type PaginationPrevProps } from "radix-vue"
import { Button } from "~/components/ui/button"
import { cn } from "@/lib/utils"
import { PhCaretLeft } from "@phosphor-icons/vue"

const props = withDefaults(
  defineProps<PaginationPrevProps & { class?: HTMLAttributes["class"] }>(),
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
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="cn('size-8 md:size-10 p-0', props.class)" variant="outline">
      <slot>
        <PhCaretLeft class="size-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
