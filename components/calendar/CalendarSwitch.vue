<script setup lang="ts">
import { useCalendar } from "@/stores/CalendarStore"
import { PhCalendarBlank } from "@phosphor-icons/vue"
import { computed } from "vue"

const { currentConfig, viewTypeOptions, getViewTypeTitle, setViewType } = useCalendar()

const viewTypeTitle = computed(() => getViewTypeTitle(currentConfig.viewType))
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton size="sm" variant="secondary">
        <PhCalendarBlank size="18" weight="fill" />

        {{ viewTypeTitle }}
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent :side="'bottom'" :collision-padding="30">
      <UiDropdownMenuLabel>
        {{ $t('ui.displayMode') }}
      </UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem
        v-for="option in viewTypeOptions"
        :key="option"
        @click="setViewType(option)"
      >
        {{ getViewTypeTitle(option) }}
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
