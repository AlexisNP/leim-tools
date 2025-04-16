<script setup lang="ts">
import { DropdownMenuArrow, type DropdownMenuArrowProps, useForwardProps } from "radix-vue"

const props = defineProps<DropdownMenuArrowProps>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuArrow class="fill-border" v-bind="forwardedProps">
    <slot />
  </DropdownMenuArrow>
</template>
