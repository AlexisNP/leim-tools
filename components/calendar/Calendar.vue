<script lang="ts" setup>
import { useCalendar } from "@/stores/CalendarStore"
import { computed, type Component, type ComputedRef } from "vue"

// import { PhMagnifyingGlass } from '@phosphor-icons/vue'
import MonthlyLayout from "./state/monthly/Layout.vue"
import CenturyLayout from "./state/centennially/Layout.vue"
import DecadeLayout from "./state/decennially/Layout.vue"
import YearLayout from "./state/yearly/Layout.vue"

import type { Calendar } from "~/models/CalendarConfig"
import type { Category } from "~/models/Category"

const props = defineProps<{
  calendarData: Calendar,
  categories: Category[]
}>()

const { setActiveCalendar } = useCalendar()
setActiveCalendar(props.calendarData, props.categories)

const { currentConfig, jumpToDate, selectedDate } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())

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
</script>

<template>
  <div class="h-full w-full relative">
    <div class="h-full grid grid-rows-[auto,1fr]">
      <CalendarMenu />

      <component :is="currentViewComponent" />

      <CalendarSearch />
      <CalendarDialogUpdateEvent v-if="!isReadOnly" />
      <CalendarDialogDeleteEvent v-if="!isReadOnly" />
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
