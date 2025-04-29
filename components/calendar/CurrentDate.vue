<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { computed } from "vue"

import { PhMapPin } from "@phosphor-icons/vue"
import { breakpointsTailwind } from "@vueuse/core"

const { defaultDate, getFormattedDateTitle, getRelativeString, getDifferenceInDays } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

const mainDateTitle = computed(() => getFormattedDateTitle(selectedDate.value, true))
// const mainDateTitle = computed(() => convertDateToDays(selectedDate.value))

const dateDifference = computed(() => getRelativeString(defaultDate, selectedDate.value))
const isToday = computed(() => getDifferenceInDays(defaultDate, selectedDate.value) === 0)
</script>

<template>
  <ClientOnly>
    <div class="grid md:flex md:gap-2 items-center">
      <h1 class="text-lg md:text-2xl max-md:leading-tight font-bold flex items-center gap-1">
        <PhMapPin
          :size="breakpoints.md.value ? 26 : 18"
          class="max-md:hidden"
          weight="light"
        />
        {{ mainDateTitle }}
      </h1>
      <h2 v-if="!isToday" class="text-sm max-md:leading-tight md:text-xl italic opacity-75">
      <span class="max-md:hidden">–</span> {{ dateDifference }}
      </h2>
    </div>

    <template #fallback>
      <div class="flex items-center gap-1">
        <UiSkeleton class="h-8 w-64 max-md:max-w-full" />
        <UiSkeleton class="max-md:hidden h-6 w-28" />
      </div>
    </template>
  </ClientOnly>
</template>
