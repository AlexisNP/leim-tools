<script lang="ts" setup>
import type { CalendarMonth } from "~/models/CalendarMonth";
import type { RPGDate } from "~/models/Date";

import { PhCalendarBlank } from "@phosphor-icons/vue";

const model = defineModel<RPGDate>({ required: true })

const props = defineProps<{
  availableMonths: CalendarMonth[]
}>()

/**
 *
 * @param e The name of today's month
 */
function setTodayMonth(e: string) {
  model.value.month = e
}

// When the model changes, get the month index from the month name
watch(model.value, (n, _o) => {
  // If the month value is already an index, return early
  if (!isNaN(+model.value.month)) return

  const monthId = props.availableMonths.findIndex((m) => m.name === n.month)

  if (monthId !== -1) {
    model.value.month = monthId + 1
  }
})
</script>

<template>
  <div class="flex gap-2 items-stretch">
    <UiInput id="new-month-current-day" v-model="model.day" type="number" name="newMonthCurrentDay" placeholder="Jour" min="1" step="1" class="invalid:border-red-600" />

    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child :disabled="props.availableMonths.length < 1">
        <UiButton size="sm" variant="secondary">
          <PhCalendarBlank size="18" weight="fill" />

          <template v-if="props.availableMonths.length < 1">
            Aucun mois disponible
          </template>
          <template v-else-if="model.month && typeof model.month === 'number'">
            {{ props.availableMonths[model.month - 1].name }}
          </template>
          <template v-else>
            Choisir le mois
          </template>
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent :side="'bottom'" :collision-padding="30">
        <UiDropdownMenuLabel>Mois disponibles</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem
          v-for="m in props.availableMonths"
          :key="m.name"
          @click="setTodayMonth(m.name)"
        >
          {{ m.name }}
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <UiInput id="new-month-current-day" v-model="model.year" type="number" name="newMonthCurrentYear" placeholder="Année" step="1" class="invalid:border-red-600" />
  </div>
</template>
