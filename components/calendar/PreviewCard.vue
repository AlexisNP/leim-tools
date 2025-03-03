<script lang="ts" setup>
import { PhCalendarDots, PhTrash } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";

defineProps<{
  calendar: Calendar
}>()

const emit = defineEmits(["on-delete"])
</script>

<template>
  <UiCard
    class="w-full h-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
    :link="`/my/calendars/${calendar.id}`"
  >
    <UiCardHeader>
      <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
    </UiCardHeader>

    <UiCardContent>
      <p class="flex items-center gap-1">
        <PhCalendarDots size="24" />
        <span>{{ $t("entity.calendar.hasXEvents", { count: calendar.eventNb?.[0].count }) }}</span>
      </p>

      <UiButton
        size="icon"
        variant="ghost"
        class="absolute top-2 right-2 z-20 hover:text-white hover:bg-rose-400 dark:hover:bg-rose-700"
        @click="emit('on-delete')"
      >
        <PhTrash size="16" />
      </UiButton>
    </UiCardContent>
  </UiCard>
</template>
