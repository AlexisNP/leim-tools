<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { computed } from "vue"

import { PhMapPin } from "@phosphor-icons/vue"

const { defaultDate, getFormattedDateTitle, getRelativeString, getDifferenceInDays } = useCalendar()
const { selectedDate } = storeToRefs(useCalendar())

const mainDateTitle = computed(() => getFormattedDateTitle(selectedDate.value, true))
// const mainDateTitle = computed(() => convertDateToDays(selectedDate.value))

const dateDifference = computed(() => getRelativeString(defaultDate, selectedDate.value))
const isToday = computed(() => getDifferenceInDays(defaultDate, selectedDate.value) === 0)
</script>

<template>
  <ClientOnly>
    <div class="flex gap-2 items-center">
      <h1 class="text-2xl font-bold flex items-center gap-1">
        <PhMapPin size="26" weight="bold" /> {{ mainDateTitle }}
      </h1>
      <h2 v-if="!isToday" class="text-xl italic opacity-75">
        – {{ dateDifference }}
      </h2>
    </div>

    <template #fallback>
      <div class="flex items-center gap-1">
        <UiSkeleton class="h-8 w-64" />
        <UiSkeleton class="h-6 w-28" />
      </div>
    </template>
  </ClientOnly>
</template>
