<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";

const props = defineProps<{
  modalState: boolean,
  calendar: Calendar | null
}>()

const isLoading = ref<boolean>(false)

const emit = defineEmits(["on-close"])

async function handleAction(): Promise<void> {
  if (isLoading.value) return
  if (!props.calendar) return

  isLoading.value = true

  try {
    await $fetch(`/api/calendars/${props.calendar.id}`, { method: "DELETE" })

    // isDeleteEventModalOpen.value = false
  } catch (err) {
    if (err instanceof Error) {
      // formErrors.message = err.message
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
function handleClosing() {
  if (!isLoading.value) {
    emit("on-close")
  }
}
</script>

<template>
  <UiAlertDialog :open="modalState">
    <UiAlertDialogContent
      :disable-outside-pointer-events="true"
      :trap-focus="true"
      class="min-w-96 bg-slate-900 border-slate-800"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
    >
      <UiAlertDialogTitle> Êtes-vous sûr de supprimer ce calendrier ?</UiAlertDialogTitle>

      <UiAlertDialogDescription>
        Les évènements ne seront plus accessibles et vous ne pourrez plus récupérer les données !
      </UiAlertDialogDescription>

      <form @submit.prevent="handleAction">
        <div class="grid grid-cols-2 gap-y-4">
          <div class="text-red-500 ml-8">
            <span class="text-sm">
              <!-- {{ formErrors.message }} -->
            </span>
          </div>
        </div>

        <footer class="flex gap-2 justify-between">
          <UiButton type="button" size="sm" variant="ghost" @click="handleClosing">
            Retour
          </UiButton>

          <div class="flex gap-2 justify-end">
            <Transition name="fade-delay">
              <UiButton v-if="isLoading" type="button" size="sm" variant="destructive">
                Annuler
              </UiButton>
            </Transition>

            <UiButton v-if="calendar" size="sm" variant="destructive" :disabled="isLoading">
              <Transition name="fade">
                <PhCircleNotch v-if="isLoading" size="20" class="animate-spin"/>
              </Transition>

              Supprimer "{{ calendar?.name }}"
            </UiButton>
          </div>
        </footer>
      </form>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
