<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  searchSlash?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button'
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class, 'group')"
  >
    <slot />

    <span
      v-if="props.searchSlash"
      class="h-4 p-1 ml-1 grid place-items-center text-[0.7em] leading-none font-semibold text-slate-500 bg-slate-100 border-slate-300 border-[1px] rounded-[3px] shadow-sm group-hover:text-slate-600 group-hover:bg-slate-200 group-hover:border-slate-400 transition-colors"
    >
      <span class="-mt-[2px]">CTRL + :</span>
    </span>
  </Primitive>
</template>
