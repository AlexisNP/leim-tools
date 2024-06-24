<script lang="ts" setup>
import type { Calendar } from '~/models/CalendarConfig';

import { PhAlarm, PhCalendarBlank, PhCalendarDots, PhLeaf, PhWrench } from '@phosphor-icons/vue';

const defaultSkeleton: Calendar = { name: '', today: { day: 1, month: 1, year: 0 }, months: [], events: []}

const calendarSkeleton = ref<Calendar>({ ...defaultSkeleton })

async function handleSubmit() {
  await $fetch(`/api/calendars/create`, { method: 'POST', body: {...calendarSkeleton.value, worldId: 1 } })
}

onMounted(() => {
  calendarSkeleton.value = { ...defaultSkeleton }
})

type FormTabs = 'global' | 'months' | 'today' | 'seasons'
const activeTab = ref<FormTabs>('months')

/**
 * === Months list handling ===
 */

/**
 * === Current date ===
 */
function setTodayMonth(e: string) {
  calendarSkeleton.value.today.month = e
}
</script>

<template>
  <template v-if="calendarSkeleton">
    <form class="h-full grid grid-rows-[auto_1fr_auto]" @submit.prevent="handleSubmit">
      <UiTabs v-model:model-value="activeTab">
        <UiTabsList class="grid w-full grid-cols-4">
          <UiTabsTrigger value="global" class="font-bold">
            <div class="flex items-center gap-1">
              <PhWrench size="18" weight="fill" />
              Général
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="months" class="font-bold">
            <div class="flex items-center gap-1">
              <PhCalendarDots size="18" weight="fill" />
              Mois de l'année
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="today" class="font-bold">
            <div class="flex items-center gap-1">
              <PhAlarm size="18" weight="fill" />
              Aujourd'hui
            </div>
          </UiTabsTrigger>
          <UiTabsTrigger value="seasons" class="font-bold">
            <div class="flex items-center gap-1">
              <PhLeaf size="18" weight="fill" />
              Saisons
            </div>
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="global">
          <input
            id="new-calendar-name"
            v-model="calendarSkeleton.name"
            type="text"
            name="new-calendar-name"
            required
            placeholder="Titre"
            class="w-full -my-1 py-1 -mx-1 px-1 text-lg border-b-[1px] bg-transparent focus-visible:outline-none focus-visible:border-blue-600"
          >
        </UiTabsContent>
        <UiTabsContent value="months">
          <p class="text-lg mb-2 font-semibold">Liste des mois disponibles</p>

          <CalendarInputMonthList v-model:model-value="calendarSkeleton.months" />
        </UiTabsContent>
        <UiTabsContent value="today">
          <p class="text-lg mb-2 font-semibold">Date d'aujourd'hui</p>

          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-2">
              <UiInput id="new-month-current-day" v-model="calendarSkeleton.today.day" type="number" name="newMonthCurrentDay" placeholder="Jour" min="1" step="1" class="invalid:border-red-600" />
            </div>
            <div class="col-span-4">
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child :disabled="calendarSkeleton.months.length < 1">
                  <UiButton size="sm" variant="secondary" class="w-full h-full">
                    <PhCalendarBlank size="18" weight="fill" />

                    <template v-if="calendarSkeleton.months.length < 1">
                      Aucun mois disponible
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
                    v-for="m in calendarSkeleton.months"
                    :key="m.name"
                    @click="setTodayMonth(m.name)"
                  >
                    {{ m.name }}
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
            <div class="col-span-2">
              <UiInput id="new-month-current-day" v-model="calendarSkeleton.today.year" type="number" name="newMonthCurrentYear" placeholder="Année" step="1" class="invalid:border-red-600" />
            </div>
          </div>
        </UiTabsContent>
        <UiTabsContent value="seasons" />
      </UiTabs>

      <footer class="text-right mt-6">
        <UiButton type="submit">
          Créer
        </UiButton>
      </footer>
    </form>
  </template>
</template>
