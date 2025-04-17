<script lang="ts" setup>
import { PhPlus } from "@phosphor-icons/vue"
import { useToast } from "~/components/ui/toast"
import { ToastLifetime } from "~/components/ui/toast/use-toast"
import { cn } from "~/lib/utils"

const { toast } = useToast()
const { t } = useI18n()

type FooterMode = "add" | "view"
const currentMode = ref<FooterMode>("view")

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
    inputFocused.value = false
  } else {
    nextTick(() => {
      inputFocused.value = false
    })
  }
}

/**
 * Toggle add mode
 */
function toggleAdd() {
  currentMode.value = "add"
  categorySkeleton.value = { name: "", color: "black" }

  nextTick(() => {
    inputFocused.value = true
  })
}

onClickOutside(rowRef, () => toggleView({ execution: "nextTick" }))
onKeyStroke("Escape", () => toggleView({ execution: "now" }))

const { addCategoryFromSkeleton } = useCategoryStore()
const { categorySkeleton } = storeToRefs(useCategoryStore())

/**
 * Submit the update
 */
async function submitNew() {
  if (!categorySkeleton.value) return
  const newCategoryName = toRaw(categorySkeleton.value).name

  const { error } = await tryCatch(addCategoryFromSkeleton())

  if (error) {
    toast({
      title: t("entity.category.addedToast.titleError", { category: newCategoryName }),
      variant: "destructive",
      duration: ToastLifetime.LONG
    })
    return
  }

  toggleView({ execution: "now" })
  toast({
    title: t("entity.category.addedToast.title", { category: newCategoryName }),
    variant: "success",
    duration: ToastLifetime.SHORT
  })
}
</script>

<template>
  <div class="border-y-[1px] border-b-foreground/10 mr-4">
    <form
      ref="rowRef"
      class="grid grid-cols-12 items-center gap-4 p-1 bg-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-900"
      @submit.prevent="submitNew"
    >
      <div v-if="currentMode === 'add'" class="col-span-1" />
      <div
        :class="cn({
          'col-span-6': currentMode === 'view',
          'col-span-5': currentMode === 'add'
        })"
      >
        <template v-if="currentMode === 'view'">
          <button
            class="p-2 h-full w-full text-left underline-offset-4 hover:underline cursor-pointer"
            @click="toggleAdd"
          >
            <PhPlus size="18" />
          </button>
        </template>
        <template v-if="currentMode === 'add' && categorySkeleton">
          <input
            ref="inputRef"
            v-model="categorySkeleton.name"
            type="text"
            class="p-1 h-full w-full bg-transparent focus-visible:outline-hidden italic"
          >
        </template>
      </div>
      <div class="col-span-4">
        <template v-if="currentMode === 'add' && categorySkeleton">
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
  </div>
</template>
