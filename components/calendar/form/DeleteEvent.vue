<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import { useToast } from "~/components/ui/toast";

const { resetSkeleton, deleteEventFromSkeleton, cancelLatestRequest } = useCalendar()
const { isDeleteEventModalOpen, eventSkeleton, lastActiveEvent } = storeToRefs(useCalendar())

const { toast } = useToast()
const { t } = useI18n()

const isLoading = ref<boolean>(false)

const formErrors = reactive<{ message: string | null }>({
  message: null
})

// Watch the popover state
watch(isDeleteEventModalOpen, (hasOpened, _o) => {
  if (hasOpened && lastActiveEvent.value) {
    eventSkeleton.value = { ...lastActiveEvent.value }
  }
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
 * Prevents the modal from closing if's still loading
 *
 * @param e The closing event (can be keydown or click)
 */
function handleClosing(e: Event): void {
  if (isLoading.value) {
    e.preventDefault()
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
  <UiAlertDialog v-model:open="isDeleteEventModalOpen">
    <UiAlertDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 border-indigo-200 dark:bg-slate-950 dark:border-indigo-950"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <UiAlertDialogTitle>{{ $t('entity.calendar.event.deleteDialog.title') }}</UiAlertDialogTitle>

      <UiAlertDialogDescription>
        {{ $t('entity.calendar.event.deleteDialog.subtitle') }}
      </UiAlertDialogDescription>

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
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
