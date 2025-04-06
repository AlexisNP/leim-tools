<script setup lang="ts">
import { PhCheck } from "@phosphor-icons/vue"
import { cn } from "~/lib/utils"
import type { Category } from "~/models/Category"

const props = defineProps<{
  category: Category
}>()

type RowMode = "edit" | "view"
const currentMode = ref<RowMode>("view")

const rowRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const { focused: inputFocused } = useFocus(inputRef)

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
    inputFocused.value = false;
  } else {
    nextTick(() => {
      inputFocused.value = false;
    })
  }
}

/**
 * Toggle edit mode
 */
function toggleEdit() {
  currentMode.value = "edit";
  categorySkeleton.value = structuredClone(toRaw(props.category))

  nextTick(() => {
    inputFocused.value = true;
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
 * TODO: Implement the update logic
 */
async function submitUpdate() {
  const { error } = await tryCatch(updateCategoryFromSkeleton())

  if (!error) {
    toggleView({ execution: "now" })
  }
}
</script>

<template>
  <div class="relative">
    <form
      ref="rowRef"
      class="grid grid-cols-12 items-center gap-4 p-1"
      :class="cn(
        { 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800': currentMode === 'edit' },
        { 'bg-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-900': currentMode !== 'edit' }
      )"
      @submit.prevent="submitUpdate"
    >
      <div
        class="col-span-6"
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
            class="p-1 h-full w-full bg-transparent focus-visible:outline-none italic"
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
              :class="cn(`bgc-${category.color}`)"
            >
              {{ $t(`ui.colors.${category.color}`) }}
            </span>
          </button>
        </template>
        <template v-else-if="currentMode === 'edit'  && categorySkeleton">
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
      <li>
        <UiButton
          v-if="currentMode === 'edit' && categorySkeleton"
          variant="secondary"
          size="icon"
          class="w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white"
          :to="{ name: 'calendar.category.edit', params: { id: category.id } }"
          :title="$t('ui.actions.edit')"
          @click="submitUpdate"
        >
          <PhCheck size="14" weight="bold" />
        </UiButton>
      </li>
    </menu>
  </div>
</template>
