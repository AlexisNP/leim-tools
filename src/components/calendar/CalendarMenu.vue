<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'
import CalendarJumpToday from './CalendarJumpToday.vue'
import CalendarNavigation from './CalendarNavigation.vue'
import CalendarSwitch from './CalendarSwitch.vue'

const { currentDate } = useCalendar()
</script>

<template>
  <header class="py-4 border-slate-700 border-b-[1px]">
    <div class="container">
      <div class="grid md:grid-cols-12 items-center">
        <div class="md:col-span-9">
          <div class="flex items-center gap-6">
            <menu class="flex items-center gap-2">
              <li>
                <CalendarSwitch />
              </li>
              <li>
                <CalendarJumpToday />
              </li>
              <li>
                <CalendarNavigation />
              </li>
            </menu>
            <h1 class="text-2xl font-bold">
              {{ currentDate.currentDateTitle }}
            </h1>
          </div>
        </div>
        <div class="md:col-span-3"></div>
      </div>
    </div>
  </header>
</template>
