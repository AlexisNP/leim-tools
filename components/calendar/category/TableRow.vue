<script setup lang="ts">
import { PhCheck, PhTrash } from "@phosphor-icons/vue"
import { useToast } from "~/components/ui/toast"
import { ToastLifetime } from "~/components/ui/toast/use-toast"
import { cn } from "~/lib/utils"
import type { Category } from "~/models/Category"

const { toast } = useToast()
const { t } = useI18n()

const { category } = defineProps<{
  category: Category
}>()

const emit = defineEmits<{
  (e: "on-delete-category", payload: Category): void
}>()

type RowMode = "edit" | "view"
const currentMode = ref<RowMode>("view")

const rowRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const { focused: inputFocused } = useFocus(inputRef)
const rowHovered = useElementHover(rowRef)

/**
 * Toggle view mode options
 */
type ToggleViewOptions = {
  execution?: "now" | "nextTick"
}

/**
 * Toggle view mode
 * @param options.execution - When to execute the toggle. "now" or "nextTick"
 */
function toggleView(options: ToggleViewOptions = { execution: "now" }) {
  currentMode.value = "view"

  if (options.execution === "now") {
    inputFocused.value = false
  } else {
    nextTick(() => {
      inputFocused.value = false
    })
  }
}

/**
 * Toggle edit mode
 */
function toggleEdit() {
  currentMode.value = "edit"
  categorySkeleton.value = structuredClone(toRaw(category))

  nextTick(() => {
    inputFocused.value = true
  })
}

onClickOutside(rowRef, () => toggleView({ execution: "nextTick" }))
onKeyStroke("Escape", () => toggleView({ execution: "now" }))

const { resetSkeleton, updateCategoryFromSkeleton } = useCategoryStore()
const { categorySkeleton } = storeToRefs(useCategoryStore())

onUnmounted(() => {
  resetSkeleton()
})

/**
 * Submit the update
 */
async function submitUpdate() {
  const { error } = await tryCatch(updateCategoryFromSkeleton())

  if (error) {
    toast({
      title: t("entity.category.updatedToast.titleError", { category: category.name }),
      variant: "destructive",
      duration: ToastLifetime.LONG
    })
    return
  }

  toggleView({ execution: "now" })
  toast({
    title: t("entity.category.updatedToast.title", { category: category.name }),
    variant: "success",
    duration: ToastLifetime.SHORT
  })
}

function handleQueryDelete() {
  categorySkeleton.value = structuredClone(toRaw(category))
  emit("on-delete-category", category)
}
</script>

<template>
  <div ref="rowRef" class="relative">
    <form
      class="grid grid-cols-12 items-center gap-4 p-1 border-b-[1px] border-b-foreground/10"
      :class="cn(
        { 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800': currentMode === 'edit' },
        { 'bg-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-900': currentMode !== 'edit' }
      )"
      @submit.prevent="submitUpdate"
    >
      <div class="col-span-1 pointer-events-none">
        <span class="opacity-50 p-2">{{ category.id }}</span>
      </div>
      <div
        class="col-span-5"
      >
        <template v-if="currentMode === 'view'">
          <button
            class="py-2 px-1 h-full w-full text-left underline-offset-4 hover:underline cursor-pointer"
            @click="toggleEdit"
          >
            {{ category.name }}
          </button>
        </template>
        <template v-else-if="currentMode === 'edit' && categorySkeleton">
          <input
            ref="inputRef"
            v-model="categorySkeleton.name"
            type="text"
            class="p-1 h-full w-full bg-transparent focus-visible:outline-hidden italic"
          >
        </template>
      </div>
      <div class="col-span-4">
        <template v-if="currentMode === 'view'">
          <button
            class="p-1 h-full w-full text-left text-sm cursor-pointer"
            @click="toggleEdit"
          >
            <span
              class="bgc"
              :class="cn(`element-${category.color}`)"
            >
              {{ $t(`ui.colors.${category.color}`) }}
            </span>
          </button>
        </template>
        <template v-else-if="currentMode === 'edit' && categorySkeleton">
          <div class="-mx-2">
            <InputColor
              id="category-color"
              v-model="categorySkeleton.color"
              position="item-aligned"
              theme="subtle"
            />
          </div>
        </template>
      </div>
    </form>
    <menu class="w-fit absolute top-1/2 -translate-y-1/2 right-2 flex items-center gap-2">
      <li
        v-if="currentMode === 'edit' && categorySkeleton"
      >
        <UiButton
          variant="secondary"
          size="icon"
          class="w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
          :title="$t('ui.actions.edit')"
          @click="submitUpdate"
        >
          <PhCheck size="14" weight="bold" />
        </UiButton>
      </li>
      <li v-else-if="rowHovered">
        <UiButton
          variant="secondary"
          size="icon"
          class="w-6 h-6 rounded-full hover:bg-red-600 hover:text-white"
          :title="$t('ui.actions.delete')"
          @click="handleQueryDelete"
        >
          <PhTrash size="14" weight="bold" />
        </UiButton>
      </li>
    </menu>
  </div>
</template>
