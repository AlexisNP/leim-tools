<script lang="ts" setup>
import type { Calendar } from "@@/models/CalendarConfig";
import { PhCircleNotch, PhWrench } from "@phosphor-icons/vue";
import type { World } from "@@/models/World";

const props = defineProps<{
  calendar: Calendar | null,
  world: World | null,
}>()

const calendarSkeleton = ref<Calendar>({ ...props.calendar } as Calendar)

onMounted(() => {
  calendarSkeleton.value = { ...props.calendar } as Calendar
})

type FormTabs = "global" | "months" | "today"
const activeTab = ref<FormTabs>("global")

/**
 * === Form Validation ===
 */

/** Whether the skeleton has valid month data */
const validSkeletonMonths = computed(() => calendarSkeleton.value.months.length > 0)

/** Whether the skeleton has a valid name */
const validSkeletonGeneral = computed(() => calendarSkeleton.value.name)

/** Whether all the data checks above are a-ok */
const validSkeleton = computed(() => validSkeletonGeneral.value && validSkeletonMonths.value)

/** Send the data to the store for validation */
const isUpdatingCalendar = ref<boolean>(false)

async function handleSubmit() {
  isUpdatingCalendar.value = true

  const fetchBody = { ...calendarSkeleton.value, worldId: props.world?.id }

  const { error } = await tryCatch(
    $fetch(`/api/calendars/${calendarSkeleton.value.id}`, { method: "PATCH", body: fetchBody })
  )

  if (error) {
    console.log(error.message)
    isUpdatingCalendar.value = false
    return
  }

  emit("on-close")
  isUpdatingCalendar.value = false
}

/**
 * Watch for name changes to display above
 */
const emit = defineEmits<{
  "on-changed-name": [calendarName: string]
  "on-close": []
}>()

/** Hook to emit a debounced event for the changed skeleton name */
const handleNameChange = useDebounceFn(() => {
  emit("on-changed-name", calendarSkeleton.value.name)
}, 400)

function handleFormCancel() {
  emit("on-close")
}
</script>

<template>
  <template v-if="calendarSkeleton">
    <form class="h-full grid grid-rows-[1fr_auto]" @submit.prevent="handleSubmit">
      <UiTabs v-model:model-value="activeTab">
        <UiTabsList class="grid w-full grid-cols-1 mb-4">
          <UiTabsTrigger value="global" class="font-bold">
            <div class="flex items-center gap-1">
              <PhWrench size="18" weight="fill" />

              {{ $t('entity.calendar.actionDialog.tabs.general.title') }}
            </div>
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="global" class="grid gap-4">
          <input
            id="new-calendar-name"
            v-model="calendarSkeleton.name"
            type="text"
            name="new-calendar-name"
            required
            :placeholder="$t('common.title')"
            class="w-full py-2 -mx-1 px-1 text-xl border-b-[1px] bg-transparent focus-visible:outline-hidden focus-visible:border-blue-600"
            @input="handleNameChange"
          >

          <div class="-mx-1 px-1 grid gap-3">
            <UiLabel for="new-calendar-state">
              {{ $t('ui.contentState.label') }}
            </UiLabel>

            <InputContentState id="new-calendar-state" v-model="calendarSkeleton.state" />
          </div>

          <div class="-mx-1 grid gap-3">
            <UiLabel for="new-calendar-color">
              {{ $t('ui.colors.label') }}
            </UiLabel>

            <InputColor id="new-calendar-color" v-model="calendarSkeleton.color" />
          </div>
        </UiTabsContent>
      </UiTabs>

      <footer class="flex justify-end gap-2 mt-6">
        <UiButton type="button" variant="destructive" @click="handleFormCancel">
          {{ $t('ui.action.cancel') }}
        </UiButton>

        <UiButton type="submit" :disabled="!validSkeleton || isUpdatingCalendar">
          <Transition name="fade">
            <PhCircleNotch v-if="isUpdatingCalendar" size="20" class="opacity-50 animate-spin"/>
          </Transition>

          {{ $t('ui.action.save') }}
        </UiButton>
      </footer>
    </form>
  </template>
</template>
