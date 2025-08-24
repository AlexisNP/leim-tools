<script lang="ts" setup>
import { PanelsLeftBottom } from "lucide-vue-next"
import { cn } from "@/lib/utils";
import { PhInfo } from "@phosphor-icons/vue";

const { isSidebarOpened } = storeToRefs(useUiStore())
</script>

<template>
  <nav
    ref="sidebarRef"
    :class="cn(
      ['max-md:hidden w-fit relative isolate p-2 grid gap-4 grid-rows-[1fr_auto] bg-background justify-center transition-colors'], // Base appearance
      ['after:opacity-50 after:contrast-125 dark:after:opacity-75'], // After styling
      ['border-r-[1px] border-r-border dark:border-r-border'], // Colours
    )"
  >
    <SidebarMenu />

    <SidebarFooter />
  </nav>

  <UiSheet v-model:open="isSidebarOpened">
    <UiSheetContent side="left" class="p-2 grid gap-4 grid-rows-[auto_1fr]">
      <UiSheetHeader />

      <SidebarMenu />
      <SidebarFooter />

    </UiSheetContent>
  </UiSheet>
</template>
