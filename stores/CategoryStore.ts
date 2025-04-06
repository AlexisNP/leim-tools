import type { Category } from "~/models/Category";

export const useCategoryStore = defineStore("calendar-category", () => {
  const { categories } = storeToRefs(useCalendar())

  /**
   * Dummy event to hold creation data
   */
  const isCreatingCategory = ref<boolean>(false)
  const isUpdatingCategory = ref<boolean>(false)
  const isDeletingCategory = ref<boolean>(false)
  const categorySkeleton = ref<Category | null>(null);

  const operationInProgress = computed<boolean>(() => isCreatingCategory.value || isUpdatingCategory.value || isDeletingCategory.value)
  let abortController: AbortController | null = null

  /**
   * Resets the dummy category data
   */
  function resetSkeleton() {
    categorySkeleton.value = null
  }

  async function updateCategoryFromSkeleton() {
    if (!categorySkeleton.value) return

    abortController = new AbortController()
    isUpdatingCategory.value = true

    const body = categorySkeleton.value

    const { data, error } = await tryCatch(
      $fetch<Category>(`/api/calendars/categories/${categorySkeleton.value.id}`, { method: "PATCH", body, signal: abortController.signal })
    )

    if (error) {
      isUpdatingCategory.value = false
      throw error
    }

    // Update the category in the store
    categories.value = categories.value.map((category) => {
      if (category.id === data.id) {
        return { ...category, ...data }
      }
      return category
    })

    abortController = null
    isUpdatingCategory.value = false
  }

  return {
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
    operationInProgress,
    categorySkeleton,
    resetSkeleton,
    updateCategoryFromSkeleton
  }
})
