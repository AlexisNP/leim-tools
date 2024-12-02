<script lang="ts" setup>
const { currentDate } = useCalendar()

// const { toast } = useToast()
// const { t } = useI18n()

// function handleGotoPreviousEventPage(position: "next" | "prev" = "next") {
//   let fromDate: RPGDate

//   // To modify, obviously
//   const daysPerMonth = 32

//   const toDay = position === "next" ? daysPerMonth : 1
//   const toMonth = position === "next" ? monthsPerYear : 0

//   switch (currentConfig.viewType) {
//     case "month":
//       fromDate = {
//         day: toDay,
//         month: currentDate.currentMonth,
//         year: currentDate.currentYear
//       }
//       break

//     case "year":
//       fromDate = {
//         day: toDay,
//         month: toMonth,
//         year: currentDate.currentYear
//       }
//       break

//     case "decade":
//       fromDate = {
//         day: toDay,
//         month: currentDate.currentMonth,
//         year: currentDate.currentYear
//       }
//       break

//     case "century":
//     default:
//       fromDate = {
//         day: toDay,
//         month: currentDate.currentMonth,
//         year: currentDate.currentYear
//       }
//       break
//   }

//   try {
//     const { targetDate } = getRelativeEventFromDate(fromDate, position)

//     jumpToDate(targetDate)
//   } catch (err) {
//     toast({
//       title: t("entity.calendar.event.outOfBoundsTitle"),
//       variant: "default",
//       description: t("entity.calendar.event.outOfBoundsMessage"),
//       duration: 4000,
//     })
//   }
// }
</script>

<template>
  <div class="flex gap-2">
    <div class="grid items-end w-40 px-4 py-2 border-slate-200 bg-white dark:bg-black dark:border-slate-700 border-x-[1px] border-t-[1px] rounded-t-sm text-sm transition-colors">
      <ClientOnly>
        <span>{{ currentDate.currentDateTitle }}</span>

        <template #fallback>
          <span class="inline-block">
            <UiSkeleton class="h-[19px] w-full rounded-sm" />
          </span>
        </template>
      </ClientOnly>
    </div>
    <!-- <div>
      <UiTooltipProvider :delay-duration="250">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton
              variant="outline"
              size="icon"
              class="rounded-t-sm rounded-b-none border-b-0"
              @click="handleGotoPreviousEventPage('prev')"
            >
              <PhArrowLineLeft size="22" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>
              {{ $t('entity.calendar.event.prevPage') }}
            </p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </div>
    <div>
      <UiTooltipProvider :delay-duration="250">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton
              variant="outline"
              size="icon"
              class="rounded-t-sm rounded-b-none border-b-0"
              @click="handleGotoPreviousEventPage('next')"
            >
              <PhArrowLineRight size="22" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>
              {{ $t('entity.calendar.event.nextPage') }}
            </p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </div> -->
  </div>
</template>
