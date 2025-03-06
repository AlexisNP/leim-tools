<script lang="ts" setup>
import { PhX } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";

const props = defineProps<{
  calendarId: number,
  modalState?: boolean
}>()

const { data: calendar } = await useFetch<{ data: Calendar }>("/api/calendars/query", { query: { id: props.calendarId } })

const calendarSkeletonName = ref<string>("")

function onChangedName(newName: string) {
  calendarSkeletonName.value = newName
}

const emit = defineEmits(["on-close"])

function handleClose() {
  emit("on-close")
  setTimeout(() => calendarSkeletonName.value = "", 100)
}
</script>

<template>
  <UiAlertDialog :open="modalState">
    <UiAlertDialogContent class="grid grid-rows-[auto_1fr_auto] items-start min-h-[66vh] max-w-4xl gap-6" @close-auto-focus="(e) => e.preventDefault()">
      <UiAlertDialogTitle>
        <span class="text-2xl">
          <strong class="font-bold">{{ calendar?.data.world?.name }}</strong>
          <span class="opacity-30"> — </span>
          <span v-if="calendarSkeletonName">
            {{ calendarSkeletonName }}
          </span>
          <span v-else>
            {{ $t('entity.calendar.updateDialog.title') }}
          </span>
        </span>
      </UiAlertDialogTitle>

      <UiButton size="icon" variant="ghost" class="absolute top-4 right-4" title="Fermer la fenêtre" @click="handleClose">
        <PhX size="20" />
      </UiButton>

      <CalendarFormUpdate v-if="calendar?.data" :calendar="calendar.data" @on-changed-name="onChangedName" @on-close="handleClose" />
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
