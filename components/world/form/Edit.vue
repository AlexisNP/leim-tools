<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import { useToast } from "~/components/ui/toast";
import { ToastLifetime } from "~/components/ui/toast/use-toast";
import type { World } from "~/models/World";

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

  try {
    isLoading.value = true
    await $fetch(`/api/worlds/${worldSkeleton.value.id}`, { method: "PATCH", body: { ...worldSkeleton.value } })

    toast({
      title: t("entity.world.updatedToast.title", { world: worldSkeleton.value.name }),
      variant: "success",
      duration: ToastLifetime.SHORT
    })

    emit("on-close")
  } catch (err) {
    console.log(err)
  } finally {
    isLoading.value = false
  }
}

/**
 * === Watch for name changes to display above ===
 */
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "on-changed-name", calendarName: string): void
    // eslint-disable-next-line no-unused-vars
  (e: "on-close"): void
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
      <div>
        <input
          id="new-world-name"
          v-model="worldSkeleton.name"
          type="text"
          name="new-world-name"
          required
          :placeholder="$t('common.title')"
          class="w-full -my-1 mb-4 py-2 -mx-1 px-1 text-xl border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
          @input="handleNameChange"
        >

        <div class="-mx-1 mb-4">
          <InputColor v-model="worldSkeleton.color" />
        </div>

        <textarea
          id="new-world-description"
          v-model="worldSkeleton.description"
          name="new-world-description"
          :placeholder="$t('entity.addDescription')"
          class="w-full -my-1 py-1 -mx-1 px-1 min-h-24 max-h-36 text-sm border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
        />
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
