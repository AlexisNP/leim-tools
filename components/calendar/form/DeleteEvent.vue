<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import { useToast } from "~/components/ui/toast";

const { resetSkeleton, deleteEventFromSkeleton, cancelLatestRequest } = useCalendar()
const { isDeleteEventModalOpen, eventSkeleton } = storeToRefs(useCalendar())

const { toast } = useToast()
const { t } = useI18n()

const isLoading = ref<boolean>(false)

const formErrors = reactive<{ message: string | null }>({
  message: null
})

async function handleAction(): Promise<void> {
  if (isLoading.value) return

  isLoading.value = true

  const eventTitle = eventSkeleton.value.title

  try {
    await deleteEventFromSkeleton()

    isDeleteEventModalOpen.value = false
    resetSkeleton()

    toast({
      title: t("entity.calendar.event.deletedToast.title", { event: eventTitle }),
      variant: "success",
      duration: 3000
    })
  } catch (err) {
    if (err instanceof Error) {
      formErrors.message = err.message
    }
  } finally {
    isLoading.value = false
  }
}

/**
 * Click on the cancel button
 *
 * Must cancel the abortController in the store, and stop the loading
 */
function handleCancel(): void {
  cancelLatestRequest()
  isLoading.value = false
}
</script>

<template>
  <form @submit.prevent="handleAction">
    <div class="grid grid-cols-2 gap-y-4">
      <div class="text-red-500 ml-8">
        <span class="text-sm">
          {{ formErrors.message }}
        </span>
      </div>
    </div>

    <footer class="flex gap-2 justify-between">
      <UiButton type="button" size="sm" variant="outline" @click="() => isDeleteEventModalOpen = false">
        {{ $t('ui.action.back') }}
      </UiButton>

      <div class="flex gap-2 justify-end">
        <Transition name="fade-delay">
          <UiButton v-if="isLoading" type="button" size="sm" variant="destructive" @click.prevent="handleCancel">
            {{ $t('ui.action.cancel') }}
          </UiButton>
        </Transition>

        <UiButton size="sm" variant="destructive" :disabled="isLoading">
          <Transition name="fade">
            <PhCircleNotch v-if="isLoading" size="20" class="animate-spin"/>
          </Transition>

          {{ $t('ui.action.delete') }}
        </UiButton>
      </div>
    </footer>
  </form>
</template>
