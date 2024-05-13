<script lang="ts" setup>
import { daysPerMonth, monthsPerYear, type LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'
import { useCalendarEvents } from '@/stores/EventStore'

import { PhArrowLineLeft, PhArrowLineRight } from '@phosphor-icons/vue'

const { currentDate, currentConfig, jumpToDate } = useCalendar()
const { getRelativeEventFromDate } = useCalendarEvents()

function handleGotoPreviousEventPage(position: 'next' | 'prev' = 'next') {
  let fromDate: LeimDate
  const toDay = position === 'next' ? daysPerMonth : 1
  const toMonth = position === 'next' ? monthsPerYear : 0

  switch (currentConfig.viewType) {
    case 'month':
      fromDate = {
        day: toDay,
        month: currentDate.currentMonth,
        year: currentDate.currentYear
      }
      break

    case 'year':
      fromDate = {
        day: toDay,
        month: toMonth,
        year: currentDate.currentYear
      }
      break

    case 'decade':
      fromDate = {
        day: toDay,
        month: currentDate.currentMonth,
        year: currentDate.currentYear
      }
      break

    case 'century':
    default:
      fromDate = {
        day: toDay,
        month: currentDate.currentMonth,
        year: currentDate.currentYear
      }
      break
  }

  try {
    const { targetDate } = getRelativeEventFromDate(fromDate, position)

    jumpToDate(targetDate)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <div class="flex gap-2">
    <div class="grid items-end w-40 px-4 py-2 border-slate-700 border-x-[1px] border-t-[1px] rounded-t-sm text-sm">
      <ClientOnly>
        <span>{{ currentDate.currentDateTitle }}</span>

        <template #fallback>
          <span class="inline-block">
            <UiSkeleton class="h-[19px] w-full rounded-sm" />
          </span>
        </template>
      </ClientOnly>
    </div>
    <div class="border-slate-700 border-x-[1px] border-t-[1px] rounded-t-sm">
      <UiTooltipProvider :delay-duration="250">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon"
              class="rounded-t-sm rounded-b-none"
              @click="handleGotoPreviousEventPage('prev')"
            >
              <PhArrowLineLeft size="22" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Précédente page à évènements</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </div>
    <div class="border-slate-700 border-x-[1px] border-t-[1px] rounded-t-sm">
      <UiTooltipProvider :delay-duration="250">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon"
              class="rounded-t-sm rounded-b-none"
              @click="handleGotoPreviousEventPage('next')"
            >
              <PhArrowLineRight size="22" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Prochaine page à évènements</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </div>
  </div>
</template>
