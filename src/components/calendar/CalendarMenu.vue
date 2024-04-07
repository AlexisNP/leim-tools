<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'
import CalendarMenuToday from './CalendarMenuToday.vue'
import CalendarMenuNav from './CalendarMenuNav.vue'
import CalendarSwitch from './CalendarSwitch.vue'
import CalendarSearch from './search/CalendarSearch.vue'
import { substractToDate } from '@/models/Date'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PhMapPin } from '@phosphor-icons/vue'

const { defaultDate, getFormattedDateTitle, currentDate } = useCalendar()
const { currentLeimDate, selectedDate } = storeToRefs(useCalendar())

const mainDateTitle = computed(() => getFormattedDateTitle(selectedDate.value, true))

const dateDifference = computed(() => substractToDate(defaultDate, currentLeimDate.value))
const formattedDateDifference = computed(() => getFormattedDateTitle(dateDifference.value, true))
</script>

<template>
  <header class="border-slate-700 border-b-[1px]">
    <div class="pt-4 container">
      <div class="grid md:grid-cols-12 items-center">
        <div class="md:col-span-9">
          <div class="flex items-center gap-6">
            <menu class="flex items-center gap-2">
              <li>
                <CalendarSwitch />
              </li>
              <li>
                <CalendarMenuToday />
              </li>
              <li>
                <CalendarMenuNav />
              </li>
            </menu>
            <div>
              <h1 class="text-2xl font-bold flex items-center gap-1">
                <PhMapPin size="26" weight="bold" /> {{ mainDateTitle }}
              </h1>
              <h2 class="text-lg italic opacity-75">Placeholder</h2>
            </div>
          </div>
        </div>
        <div class="md:col-span-3 flex justify-end">
          <CalendarSearch />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="flex">
        <div class="px-4 py-2 border-slate-700 border-x-[1px] border-t-[1px] rounded-sm">
          <span class="text-sm font-bold">{{ currentDate.currentDateTitle }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
