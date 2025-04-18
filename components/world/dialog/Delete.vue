<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import { useToast } from "~/components/ui/toast";
import { ToastLifetime } from "~/components/ui/toast/use-toast";
import type { World } from "~/models/World";

const { toast } = useToast()
const { t } = useI18n()

const props = defineProps<{
  modalState: boolean,
  world: World | null
}>()

const isLoading = ref<boolean>(false)

const emit = defineEmits(["on-close"])

async function handleAction(): Promise<void> {
  if (isLoading.value || !props.world) return

  isLoading.value = true

  const { error } = await tryCatch(
    $fetch(`/api/worlds/${props.world.id}`, { method: "DELETE" })
  )

  if (error) {
    toast({
      title: error.message,
      variant: "destructive"
    })
    isLoading.value = false
    return
  }

  toast({
    title: t("entity.world.deletedToast.title", { world: props.world.name }),
    variant: "success",
    duration: ToastLifetime.SHORT
  })
  emit("on-close")
  isLoading.value = false
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
      class="min-w-96"
      @escape-key-down="handleClosing"
      @focus-outside="handleClosing"
      @interact-outside="handleClosing"
      @pointer-down-outside="handleClosing"
      @close-auto-focus="(e) => e.preventDefault()"
    >
      <UiAlertDialogTitle>
        {{ $t('entity.world.deleteDialog.title') }}
      </UiAlertDialogTitle>

      <UiAlertDialogDescription>
        {{ $t('entity.world.deleteDialog.subtitle') }}
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
          <UiButton type="button" size="sm" variant="outline" @click="handleClosing">
            {{ $t('ui.action.back') }}
          </UiButton>

          <div class="flex gap-2 justify-end">
            <Transition name="fade-delay">
              <UiButton v-if="isLoading" type="button" size="sm" variant="destructive">
                {{ $t('ui.action.cancel') }}
              </UiButton>
            </Transition>

            <UiButton v-if="world" size="sm" variant="destructive" :disabled="isLoading">
              <Transition name="fade">
                <PhCircleNotch v-if="isLoading" size="20" class="animate-spin"/>
              </Transition>

              {{ $t('entity.deleteOne', { entity: world?.name }) }}
            </UiButton>
          </div>
        </footer>
      </form>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
