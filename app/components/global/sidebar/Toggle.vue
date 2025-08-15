<script lang="ts" setup>
import { PhList } from "@phosphor-icons/vue"

const { toggleSidebar } = useUiStore()
</script>

<template>
  <UiButton
    size="icon"
    variant="outline"
    class="size-7 border-border hover:bg-secondary hover:text-secondary-foreground"
    @click="toggleSidebar"
  >
    <PhList size="14" weight="light" />
  </UiButton>
</template>
