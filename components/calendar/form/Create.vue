<script lang="ts" setup>
import type { Calendar } from "~/models/CalendarConfig";
import { PhAlarm, PhCalendarDots, PhCircleNotch, PhWrench } from "@phosphor-icons/vue";

const defaultSkeleton: Calendar = { name: "", today: { day: 1, month: 0, year: 0 }, months: [], events: [], state: "draft" }
const calendarSkeleton = ref<Calendar>({ ...defaultSkeleton })

onMounted(() => {
  calendarSkeleton.value = { ...defaultSkeleton }
})

type FormTabs = "global" | "months" | "today"
const activeTab = ref<FormTabs>("global")

/**
 * === Current date ===
 */
// If the months data change, just reset today's month
// This is a failsafe mainly because of 1) month positions and 2) month names
watch(calendarSkeleton.value.months, () => {
  calendarSkeleton.value.today.month = 0
}, { deep: true })

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
const isCreatingCalendar = ref<boolean>(false)

async function handleSubmit() {
  try {
    isCreatingCalendar.value = true
    await $fetch("/api/calendars/create", { method: "POST", body: { ...calendarSkeleton.value, worldId: 1 } })

    emit("on-close")
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingCalendar.value = false
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
        <UiTabsList class="grid w-full grid-cols-3 mb-4">
          <UiTabsTrigger value="global" class="font-bold">
            <div class="flex items-center gap-1">
              <PhWrench size="18" weight="fill" />

              {{ $t('entity.calendar.createDialog.tabs.general.title') }}
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="months" class="font-bold">
            <div class="flex items-center gap-1">
              <PhCalendarDots size="18" weight="fill" />

              {{ $t('entity.calendar.createDialog.tabs.months.title') }}
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="today" class="font-bold">
            <div class="flex items-center gap-1">
              <PhAlarm size="18" weight="fill" />

              {{ $t('entity.calendar.createDialog.tabs.today.title') }}
            </div>
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="global">
          <input
            id="new-calendar-name"
            v-model="calendarSkeleton.name"
            type="text"
            name="new-calendar-name"
            required
            :placeholder="$t('common.title')"
            class="w-full -my-1 py-2 -mx-1 px-1 text-xl border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
            @input="handleNameChange"
          >
        </UiTabsContent>
        <UiTabsContent value="months">
          <CalendarInputMonthList v-model:model-value="calendarSkeleton.months" />
        </UiTabsContent>
        <UiTabsContent value="today">
          <CalendarInputTodaySelect v-model:model-value="calendarSkeleton.today" :available-months="calendarSkeleton.months"/>
        </UiTabsContent>
      </UiTabs>

      <footer class="flex justify-end gap-2 mt-6">
        <UiButton type="button" variant="destructive" @click="handleFormCancel">
          {{ $t('ui.action.cancel') }}
        </UiButton>

        <UiButton type="submit" :disabled="!validSkeleton || isCreatingCalendar">
          <Transition name="fade">
            <PhCircleNotch v-if="isCreatingCalendar" size="20" class="opacity-50 animate-spin"/>
          </Transition>

          {{ $t('ui.action.save') }}
        </UiButton>
      </footer>
    </form>
  </template>
</template>
