<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue"
import { TagsInputItemDelete, type TagsInputItemDeleteProps, useForwardProps } from "radix-vue"
import { cn } from "~/lib/utils"
import { PhX } from "@phosphor-icons/vue";

const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TagsInputItemDelete
    v-bind="forwardedProps"
    :class="cn('flex rounded bg-transparent mr-1', props.class)"
  >
    <slot>
      <PhX class="size-4" />
    </slot>
  </TagsInputItemDelete>
</template>
