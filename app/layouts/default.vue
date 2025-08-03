<script lang="ts" setup>
import { cn } from '~/lib/utils';

const { isSidebarOpened } = storeToRefs(useUiStore())
</script>

<template>
  <div
    class="h-full grid md:grid-cols-[auto_1fr] dark:bg-black transition-colors after:absolute after:transition-colors"
    :class="cn({
      'max-md:after:bg-transparent': isSidebarOpened,
      'has-sidebar max-md:after:bg-black/20 md:after:opacity-0 md:after:pointer-events-none': isSidebarOpened
    })"
  >
    <Sidebar />

    <div
      class="wrapper max-h-screen transition-all overflow-y-auto"
    >
      <slot />
    </div>
  </div>
</template>
