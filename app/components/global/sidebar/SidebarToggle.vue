<script lang="ts" setup>
import { PhList } from "@phosphor-icons/vue"

const { toggleSidebar } = useUiStore()
</script>

<template>
  <UiButton
    size="icon"
    variant="outline"
    @click="toggleSidebar"
  >
    <PhList size="19" weight="light" />
  </UiButton>
</template>
