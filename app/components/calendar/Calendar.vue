<script lang="ts" setup>
import { useCalendar } from "@/stores/CalendarStore"

// import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import MonthlyLayout from "./state/monthly/Layout.vue"
import CenturyLayout from "./state/centennially/Layout.vue"
import DecadeLayout from "./state/decennially/Layout.vue"
import YearLayout from "./state/yearly/Layout.vue"

import { onKeyDown } from "@vueuse/core"

const { currentConfig, jumpToDate, selectedDate, toPastFar, toPastNear, toFutureNear, toFutureFar, toggleCreatingEventModal } = useCalendar()
const { isReadOnly, calendarState } = storeToRefs(useCalendar())

const currentViewComponent: ComputedRef<Component> = computed<Component>(() => {
  switch (currentConfig.viewType) {
    case "month":
      return MonthlyLayout

    case "year":
      return YearLayout

    case "decade":
      return DecadeLayout

    case "century":
    default:
      return CenturyLayout
  }
})

onMounted(() => {
  jumpToDate(selectedDate)
})

/**
 * Keyboard quick controls
 */
// Key combos to navigate
const {
  arrowUp, arrowLeft, pageUp,
  arrowDown, arrowRight, pageDown,
} = useMagicKeys()

watch([arrowUp, arrowLeft], (k) => {
  if (calendarState.value === 'active' && (k[0] || k[1])) {
    toPastNear()
  }
})
watch(pageUp!, (k) => {
  if (calendarState.value === 'active' && k) {
    toPastFar()
  }
})

watch([arrowDown, arrowRight], (k) => {
  if (calendarState.value === 'active' && (k[0] || k[1])) {
    toFutureNear()
  }
})
watch(pageDown!, (k) => {
  if (calendarState.value === 'active' && k) {
    toFutureFar()
  }
})

// Key combo to create an event
onKeyDown("+", (e) => {
  if (calendarState.value === 'active') {
    e.preventDefault()
    toggleCreatingEventModal()
  }
})
</script>

<template>
  <div class="h-full w-full relative">
    <div class="h-full grid grid-rows-[auto_1fr]">
      <CalendarMenu />

      <component :is="currentViewComponent" />

      <CalendarSearch />
      <LazyCalendarDialogCategories v-if="!isReadOnly" />
      <LazyCalendarDialogUpdateEvent v-if="!isReadOnly" />
      <LazyCalendarDialogDeleteEvent v-if="!isReadOnly" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screen-move, /* apply transition to moving elements */
.screen-enter-active,
.screen-leave-active {
  transition: all .4s ease-out;
}

.screen-enter-from,
.screen-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.screen-leave-active {
  position: absolute;
}
</style>
