<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import { useToast } from "~/components/ui/toast";
import { ToastLifetime } from "~/components/ui/toast/use-toast";
import type { World } from "@@/models/World";

const { toast } = useToast()
const { t } = useI18n()

const user = useSupabaseUser()

const props = defineProps<{
  world: World | null
}>()

const worldSkeleton = ref<World>({ ...props.world } as World)

onMounted(() => {
  worldSkeleton.value = { ...props.world } as World
})

const isLoading = ref<boolean>(false)

/**
 * === Form Validation ===
 */
/** Whether the skeleton has a valid name */
const validSkeleton = computed(() => worldSkeleton.value.name)

async function handleSubmit() {
  if (!user.value || !worldSkeleton.value) return

  isLoading.value = true

  const { error } = await tryCatch(
    $fetch(`/api/worlds/${worldSkeleton.value.id}`, { method: "PATCH", body: { ...worldSkeleton.value } })
  )

  if (error) {
    console.log(error.message)
    isLoading.value = false
    return
  }

  toast({
    title: t("entity.world.updatedToast.title", { world: worldSkeleton.value.name }),
    variant: "success",
    duration: ToastLifetime.SHORT
  })

  emit("on-close")
  isLoading.value = false
}

/**
 * === Watch for name changes to display above ===
 */
const emit = defineEmits<{
  "on-changed-name": [calendarName: string]
  "on-close": []
}>()

/** Hook to emit a debounced event for the changed skeleton name */
const handleNameChange = useDebounceFn(() => {
  emit("on-changed-name", worldSkeleton.value.name)
}, 400)

function handleFormCancel() {
  emit("on-close")
}
</script>

<template>
  <template v-if="worldSkeleton">
    <form class="h-full grid grid-rows-[1fr_auto]" @submit.prevent="handleSubmit">
      <div class="grid gap-4">
        <input
          id="new-world-name"
          v-model="worldSkeleton.name"
          type="text"
          name="new-world-name"
          required
          :placeholder="$t('common.title')"
          class="w-full -my-1 py-2 -mx-1 px-1 text-xl border-b-[1px] bg-transparent focus-visible:outline-hidden focus-visible:border-primary invalid:border-destructive"
          @input="handleNameChange"
        >

        <InputEditor
          disable-blocks
          v-model="worldSkeleton.description"
        />

        <div class="-mx-1 grid gap-3">
          <UiLabel for="new-world-state">
            {{ $t('ui.contentState.label') }}
          </UiLabel>

          <InputContentState id="new-world-state" v-model="worldSkeleton.state" />
        </div>

        <div class="-mx-1 grid gap-3">
          <UiLabel for="new-world-color">
            {{ $t('ui.colors.label') }}
          </UiLabel>

          <InputColor id="new-world-color" v-model="worldSkeleton.color" />
        </div>
      </div>

      <footer class="flex justify-end gap-2 mt-6">
        <UiButton type="button" variant="destructive" @click="handleFormCancel">
          {{ $t('ui.action.cancel') }}
        </UiButton>

        <UiButton type="submit" :disabled="!validSkeleton || isLoading">
          <Transition name="fade">
            <PhCircleNotch v-if="isLoading" size="20" class="opacity-50 animate-spin"/>
          </Transition>

          {{ $t('ui.action.save') }}
        </UiButton>
      </footer>
    </form>
  </template>
</template>
