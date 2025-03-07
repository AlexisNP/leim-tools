<script lang="ts" setup>
import { PhArchive, PhCalendarDots, PhFile, PhFileDashed, PhFilePlus, PhPencil, PhPencilSimpleLine, PhTrash } from "@phosphor-icons/vue";
import { DateTime } from "luxon";
import type { Calendar } from "~/models/CalendarConfig";

const props = defineProps<{
  calendar: Calendar,
  gmId?: string,
  showActions?: boolean,
}>()

const emit = defineEmits(["on-edit", "on-delete"])

const { locale } = useI18n();

const createdAt = DateTime.fromISO(props.calendar.createdAt!).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value });
const updatedAt = computed<string>(() => props.calendar.updatedAt ? DateTime.fromISO(props.calendar.updatedAt).toLocaleString(DateTime.DATETIME_MED, { locale: locale.value }) : "");

const user = useSupabaseUser();
const isOwner = computed(() => user.value && props.gmId && user.value.id === props.gmId);
const calendarLink = computed(() => isOwner.value ? `/my/calendars/${props.calendar.id}` : `/calendars/${props.calendar.shortId}`);
</script>

<template>
  <UiCard
    class="w-full h-full flex flex-col transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
    :link="calendarLink"
  >
    <UiCardHeader class="gap-4">
      <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>

      <div v-if="calendar.state === 'published'" class="flex items-center gap-1 text-sm">
        <PhFile size="20" weight="fill" />
        <span>{{ $t('ui.contentState.published') }}</span>
      </div>
      <div v-if="calendar.state === 'draft'" class="flex items-center gap-1 text-sm">
        <PhFileDashed size="20" weight="fill" />
        <span>{{ $t('ui.contentState.draft') }}</span>
      </div>
      <div v-if="calendar.state === 'archived'" class="flex items-center gap-1 text-sm">
        <PhArchive size="20" weight="fill" />
        <span>{{ $t('ui.contentState.archived') }}</span>
      </div>
    </UiCardHeader>

    <UiCardContent class="grow">
      <p class="flex items-center gap-1">
        <PhCalendarDots size="24" weight="fill" />
        <span>{{ $t("entity.calendar.hasXEvents", { count: calendar.eventNb?.[0].count }) }}</span>
      </p>

      <div
        v-if="isOwner && showActions"
        class="flex gap-1 absolute top-4 right-4 z-20"
      >
        <UiButton size="icon" variant="ghost" class=" hover:text-white hover:bg-indigo-400 dark:hover:bg-indigo-700" @click="emit('on-edit')">
          <PhPencil size="16" />
        </UiButton>

        <UiButton size="icon" variant="ghost" class=" hover:text-white hover:bg-rose-400 dark:hover:bg-rose-700" @click="emit('on-delete')">
          <PhTrash size="16" />
        </UiButton>
      </div>
    </UiCardContent>

    <UiCardFooter>
      <ul class="grid gap-1 text-sm">
        <li class="flex gap-1 items-center">
          <PhFilePlus size="18" />
          <span>{{ $t('common.createdAt', { createdAt }) }}</span>
        </li>
        <li v-if="updatedAt" class="flex gap-1 items-center">
          <PhPencilSimpleLine size="18" />
          <span>{{ $t('common.updatedAt', { updatedAt }) }}</span>
        </li>
      </ul>
    </UiCardFooter>
  </UiCard>
</template>
