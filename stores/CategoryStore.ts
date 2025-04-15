import type { Category } from "~/models/Category";

export const useCategoryStore = defineStore("calendar-category", () => {
  const { activeCalendar, categories } = storeToRefs(useCalendar())

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

  async function addCategoryFromSkeleton() {
    if (!categorySkeleton.value) return

    abortController = new AbortController()

    isCreatingCategory.value = true

    const { data, error } = await tryCatch(
      $fetch<Category>("/api/calendars/categories/create", { method: "POST", body: { category: categorySkeleton.value, calendarId: activeCalendar.value?.id }, signal: abortController.signal })
    )

    if (error) {
      isCreatingCategory.value = false
      throw error
    }

    // Update the category in the store
    categories.value.push(data)

    abortController = null
    isCreatingCategory.value = false
    resetSkeleton()
  }

  async function updateCategoryFromSkeleton() {
    if (!categorySkeleton.value) return

    abortController = new AbortController()
    isUpdatingCategory.value = true

    const { data, error } = await tryCatch(
      $fetch<Category>(`/api/calendars/categories/${categorySkeleton.value.id}`, { method: "PATCH", body: { category: categorySkeleton.value, calendarId: activeCalendar.value?.id }, signal: abortController.signal })
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
    resetSkeleton()
  }

  return {
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
    operationInProgress,
    categorySkeleton,
    resetSkeleton,
    addCategoryFromSkeleton,
    updateCategoryFromSkeleton
  }
})
