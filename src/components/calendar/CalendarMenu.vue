<script lang="ts" setup>
import { getRelativeString } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { PhMapPin } from '@phosphor-icons/vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import CalendarMenuNav from './CalendarMenuNav.vue'
import CalendarMenuToday from './CalendarMenuToday.vue'
import CalendarSwitch from './CalendarSwitch.vue'
import CalendarSearch from './search/CalendarSearch.vue'

const { defaultDate, getFormattedDateTitle, currentDate } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

const mainDateTitle = computed(() => getFormattedDateTitle(selectedDate.value, true))

const dateDifference = computed(() => getRelativeString(defaultDate, selectedDate.value))
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
              <h2 class="text-lg italic opacity-75">
                {{ dateDifference }}
              </h2>
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
