<script setup lang="ts">
import type { Category } from "~/models/Category";
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from "radix-vue"

const { t } = useI18n()

const { categories } = defineProps<{
  categories: Category[]
}>()

const sortedCategories = computed(() => categories.toSorted((a, b) => a.name.localeCompare(b.name)))

const deleteDialogOpened = ref<boolean>(false)

function openDeleteDialog() {
  deleteDialogOpened.value = true
}

function closeDeleteDialog() {
  deleteDialogOpened.value = false
}
</script>

<template>
  <div class="flex flex-col h-full">
    <CalendarCategoryTableHeader />

    <ScrollAreaRoot class="h-36 grow overflow-hidden ">
      <ScrollAreaViewport class="w-full h-full pr-4" as-child>
        <div class="last:border-0">
          <CalendarCategoryTableRow
            v-for="item in sortedCategories"
            :key="item.id"
            :category="item"
            @on-delete-category="openDeleteDialog"
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

    <CalendarCategoryTableFooter />
  </div>

  <UiDialog v-model:open="deleteDialogOpened">
    <UiDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="closeDeleteDialog"
      @focus-outside="closeDeleteDialog"
      @interact-outside="closeDeleteDialog"
      @pointer-down-outside="closeDeleteDialog"
    >
      <UiDialogTitle>
        {{ $t('entity.category.deleteDialog.title') }}
      </UiDialogTitle>
      <UiDialogDescription>
        {{ $t('entity.category.deleteDialog.subtitle') }}
      </UiDialogDescription>

      <CalendarFormDeleteCategory />
    </UiDialogContent>
  </UiDialog>
</template>
