<script lang="ts" setup>
import { PhCalendarDots, PhFilePlus, PhPencilSimpleLine, PhTrash } from "@phosphor-icons/vue";
import { DateTime } from "luxon";
import type { Calendar } from "~/models/CalendarConfig";

const props = defineProps<{
  calendar: Calendar,
  gmId?: string,
  showActions?: boolean,
}>()

const emit = defineEmits(["on-delete"])

const { locale } = useI18n();

const createdAt = DateTime.fromISO(props.calendar.createdAt!).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value });
const updatedAt = computed<string>(() => props.calendar.updatedAt ? DateTime.fromISO(props.calendar.updatedAt).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value }) : "");

const user = useSupabaseUser();
const isOwner = computed(() => user.value && props.gmId && user.value.id === props.gmId);
const calendarLink = computed(() => isOwner.value ? `/my/calendars/${props.calendar.id}` : `/calendars/${props.calendar.shortId}`);
</script>

<template>
  <UiCard
    class="w-full h-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
    :link="calendarLink"
  >
    <UiCardHeader>
      <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
    </UiCardHeader>

    <UiCardContent>
      <p class="flex items-center gap-1">
        <PhCalendarDots size="24" weight="fill" />
        <span>{{ $t("entity.calendar.hasXEvents", { count: calendar.eventNb?.[0].count }) }}</span>
      </p>

      <UiButton
        v-if="isOwner && showActions"
        size="icon"
        variant="ghost"
        class="absolute top-2 right-2 z-20 hover:text-white hover:bg-rose-400 dark:hover:bg-rose-700"
        @click="emit('on-delete')"
      >
        <PhTrash size="16" />
      </UiButton>
    </UiCardContent>

    <UiCardFooter>
      <ul class="grid gap-2">
        <li class="flex gap-1 items-center">
          <PhFilePlus size="20" />
          <span>{{ $t('common.createdAt', { createdAt }) }}</span>
        </li>
        <li v-if="updatedAt" class="flex gap-1 items-center">
          <PhPencilSimpleLine size="20" />
          <span>{{ $t('common.updatedAt', { updatedAt }) }}</span>
        </li>
      </ul>
    </UiCardFooter>
  </UiCard>
</template>
