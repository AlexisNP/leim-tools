<script lang="ts" setup>
import type { Calendar } from '~/models/CalendarConfig';
import { PhAlarm, PhCalendarDots, PhWrench } from '@phosphor-icons/vue';

const defaultSkeleton: Calendar = { name: '', today: { day: 1, month: 0, year: 0 }, months: [], events: []}
const calendarSkeleton = ref<Calendar>({ ...defaultSkeleton })

onMounted(() => {
  calendarSkeleton.value = { ...defaultSkeleton }
})

type FormTabs = 'global' | 'months' | 'today'
const activeTab = ref<FormTabs>('global')

/**
 * === Months list handling ===
 */

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
async function handleSubmit() {
  await $fetch(`/api/calendars/create`, { method: 'POST', body: {...calendarSkeleton.value, worldId: 1 } })
}

/**
 * === Watch for name changes to display above ===
 */
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'changed-name', calendarName: string): void
}>()

/** Hook to emit a debounced event for the changed skeleton name */
const handleNameChange = useDebounceFn(() => {
  emit('changed-name', calendarSkeleton.value.name)
}, 400)
</script>

<template>
  <template v-if="calendarSkeleton">
    <form class="h-full grid grid-rows-[1fr_auto]" @submit.prevent="handleSubmit">
      <UiTabs v-model:model-value="activeTab">
        <UiTabsList class="grid w-full grid-cols-3 mb-4">
          <UiTabsTrigger value="global" class="font-bold">
            <div class="flex items-center gap-1">
              <PhWrench size="18" weight="fill" />
              Général
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="months" class="font-bold">
            <div class="flex items-center gap-1">
              <PhCalendarDots size="18" weight="fill" />
              Mois de l'année
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="today" class="font-bold">
            <div class="flex items-center gap-1">
              <PhAlarm size="18" weight="fill" />
              Aujourd'hui
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
            placeholder="Titre"
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

      <footer class="text-right mt-6">
        <UiButton type="submit" :disabled="!validSkeleton">
          Créer
        </UiButton>
      </footer>
    </form>
  </template>
</template>
