<script lang="ts" setup>
import { isCharacter, type Character } from '@/models/Characters'
import { compareDates, type RPGDate, type RPGDateOrder } from '@/models/Date'
import { isCalendarEvent, type CalendarEvent } from '~/models/CalendarEvent'
import { useCalendar } from '@/stores/CalendarStore'
import { computed } from 'vue'
import type { SearchMode } from '../../SearchMode'

import CharacterCallout from './CharacterCallout.vue'
import EventCallout from './EventCallout.vue'

const props = defineProps<{
  results: (Character | CalendarEvent)[]
  currentEntity: SearchMode
  order: RPGDateOrder
  startAt: number
  endAt: number
  limit?: number
}>()

const emit = defineEmits(['jumpedToDate'])

const { jumpToDate } = useCalendar()

function handleJumpToDate(date?: RPGDate) {
  if (!date) return

  jumpToDate(date)
  emit('jumpedToDate')
}

// Initial sorting of the results
const sortedResults = computed(() => {
  return [...props.results].sort((a, b) => {
    let firstDate: RPGDate
    let secondDate: RPGDate

    if (isCalendarEvent(a)) {
      firstDate = a.startDate
    } else if (isCharacter(a) && a.birth) {
      firstDate = a.birth
    } else {
      return 1
    }

    if (isCalendarEvent(b)) {
      secondDate = b.startDate
    } else if (isCharacter(b) && b.birth) {
      secondDate = b.birth
    } else {
      return -1
    }

    return compareDates(firstDate, secondDate, props.order)
  })
})

// Page the sorted results
const pagedResults = computed(() => sortedResults.value.slice(props.startAt, props.endAt))
</script>

<template>
  <ul class="grid gap-4">
    <li v-for="r in pagedResults" :key="isCalendarEvent(r) ? r.title : r.name">
      <EventCallout v-if="isCalendarEvent(r)" :event="r" @query:date-jump="handleJumpToDate" />

      <CharacterCallout
        v-else-if="isCharacter(r)"
        :character="r"
        @query:date-jump="handleJumpToDate"
      />
    </li>
  </ul>
</template>
