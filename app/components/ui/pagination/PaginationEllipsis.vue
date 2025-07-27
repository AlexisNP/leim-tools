<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { PaginationEllipsis, type PaginationEllipsisProps } from "radix-vue"
import { cn } from "@/lib/utils"
import { PhArrowsHorizontal } from "@phosphor-icons/vue";

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis
    v-bind="delegatedProps"
    :class="cn('size-8 md:size-10 flex items-center justify-center', props.class)"
  >
    <slot>
      <PhArrowsHorizontal />
    </slot>
  </PaginationEllipsis>
</template>
