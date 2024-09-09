<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
import type { World } from "~/models/World";

const user = useSupabaseUser()

const defaultWorld: World = { name: "", description: "", gmId: user.value?.id }
const worldSkeleton = ref<World>({ ...defaultWorld })

onMounted(() => {
  worldSkeleton.value = { ...defaultWorld }
})

const isLoading = ref<boolean>(false)

/**
 * === Form Validation ===
 */
/** Whether the skeleton has a valid name */
const validSkeleton = computed(() => worldSkeleton.value.name)

async function handleSubmit() {
  if (!user.value) return

  try {
    isLoading.value = true
    await $fetch("/api/worlds/create", { method: "POST", body: { ...worldSkeleton.value } })

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
