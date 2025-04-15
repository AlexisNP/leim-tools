<script setup lang="ts">
import type { Category } from "~/models/Category";
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "radix-vue"

const { categories } = defineProps<{
  categories: Category[]
}>()

const sortedCategories = computed(() => categories.toSorted((a, b) => a.name.localeCompare(b.name)))
</script>

<template>
  <div class="flex flex-col h-full">
    <header class="grid grid-cols-12 gap-4 px-2 py-4 border-b-[1px] border-b-foreground/10 font-bold">
      <div class="col-span-6">
        Nom
      </div>
      <div class="col-span-4">
        Couleur
      </div>
      <div class="col-span-2" />
    </header>

    <ScrollAreaRoot class="h-36 grow overflow-hidden ">
      <ScrollAreaViewport class="w-full h-full pr-4" as-child>
        <div class="[&:last-child]:border-0">
          <CalendarCategoryTableRow
            v-for="item in sortedCategories"
            :key="item.id"
            :category="item"
          />
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        class="flex select-none touch-none p-0.5 bg-background transition-colors duration-100 ease-out hover:bg-foreground/5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollAreaThumb
          class="flex-1 bg-foreground/20 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full"
        />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
  </div>
</template>
