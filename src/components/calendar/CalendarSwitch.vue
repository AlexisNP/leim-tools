<script setup lang="ts">
import { useCalendar } from '@/stores/CalendarStore'
import { PhCalendarBlank } from '@phosphor-icons/vue'
import { computed } from 'vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Button from '../ui/button/Button.vue'

const { currentConfig, viewTypeOptions, getViewTypeTitle, setViewType } = useCalendar()

const viewTypeTitle = computed(() => getViewTypeTitle(currentConfig.viewType))
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button size="sm" variant="secondary">
        <PhCalendarBlank size="18" weight="fill" />

        {{ viewTypeTitle }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Mode d'affichage</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="option in viewTypeOptions"
        :key="option"
        @click="setViewType(option)"
      >
        {{ getViewTypeTitle(option) }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
