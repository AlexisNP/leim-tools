<script lang="ts" setup>
import type { LeimDate } from '@/models/Date'

const props = defineProps<{
  date: LeimDate
  faded?: boolean
}>()
</script>

<template>
  <div
    class="tile relative text-xs text-center p-4 border-slate-700"
    :class="{
      'text-slate-500': props.faded,
      'text-slate-300': !props.faded
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tile {
  &:not(:nth-child(10n)) {
    border-right-width: 1px;
  }

  &:nth-child(n + 11) {
    border-top-width: 1px;
  }
}
</style>
