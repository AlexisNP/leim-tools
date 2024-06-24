<script lang="ts" setup>
import type { Calendar } from '~/models/CalendarConfig';
import type { CalendarMonth } from '~/models/CalendarMonth';
import { useSortable } from '@vueuse/integrations/useSortable'

import { PhAlarm, PhCalendarBlank, PhCalendarDots, PhLeaf, PhList, PhPlus, PhTrash, PhWrench } from '@phosphor-icons/vue';

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
 * Input value for new month's name
 */
const monthName: Ref<string | undefined> = ref<string>()
const monthNameRef = ref<HTMLInputElement>()
const { focused: monthNameFocused } = useFocus(monthNameRef)
const validMonthNameDatatypes = ['string']
const validMonthName = computed(() => validMonthNameDatatypes.includes(typeof monthName.value))

/**
 * Input value for new month's number of days
 */
const monthDays: Ref<number | undefined> = ref<number>()
const monthDaysRef = ref<HTMLInputElement>()
const validMonthDaysDatatypes = ['number']
const validMonthDays = computed(() => validMonthDaysDatatypes.includes(typeof monthDays.value))

const validNewMonth = computed(() => validMonthDays.value && validMonthName.value)

function addMonthToCalendar() {
  console.log(monthDays.value, monthName.value)
  if (!monthDays.value || !monthName.value) return

  const monthToInsert: CalendarMonth = {
    name: monthName.value,
    days: monthDays.value,
    position: calendarSkeleton.value.months.length
  }

  calendarSkeleton.value.months.push(monthToInsert)

  monthName.value = ''
  monthNameFocused.value = true
}

function removeMonthFromCalendar(index: number) {
  if (isNaN(index)) return

  calendarSkeleton.value.months.splice(index, 1)
}

// Sortable
const monthSortableList = ref<HTMLElement | null>(null)
const { start, stop } = useSortable(monthSortableList, calendarSkeleton.value.months, { animation: 150 })

// Refresh the sortable list when the tabs is re-rendered
watch(activeTab, (n, _o) => {
  if (n === 'months') {
    start()
  } else {
    stop()
  }
})

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
          <div class="grid md:grid-cols-12 gap-4 items-center">
            <div class="md:col-start-2 md:col-span-5">
              <UiInput id="new-month-name" ref="monthNameRef" v-model="monthName" type="text" name="newMonthName" placeholder="Nom du mois" />
            </div>
            <div class="md:col-span-5">
              <UiInput id="new-month-days" ref="monthDaysRef" v-model="monthDays" type="number" name="newMonthName" placeholder="Nombre de jours" min="0" step="1" class="invalid:border-red-600" />
            </div>
            <div class="md:col-span-1">
              <UiButton size="icon" class="rounded-full h-8 w-8" :disabled="!validNewMonth" @click.prevent="addMonthToCalendar">
                <PhPlus size="17"/>
              </UiButton>
            </div>
            <div class="md:col-span-full">
              <div class="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                <div class="hidden md:block col-span-1">
                  <ul class="grid gap-y-4 justify-center">
                    <li v-for="(m, i) in calendarSkeleton.months" :key="`num-${m.name}`">
                      <UiButton size="icon" variant="secondary" class="h-8 w-8 rounded-full">
                        <span class="font-bold text-sm">{{ i + 1 }}</span>
                      </UiButton>
                    </li>
                  </ul>
                </div>
                <div class="md:col-span-11">
                  <ul ref="monthSortableList" class="grid gap-y-2">
                    <li v-for="(m, i) in calendarSkeleton.months" :key="m.name" class="grid md:grid-cols-12 gap-4 md:items-center text-slate-900 bg-slate-200 rounded-md">
                      <div class="md:col-span-1 text-right duration-200 ease-out transition transform origin-top-right">
                        <UiButton type="button" variant="ghost" size="icon" class="handle rounded-full h-8 w-8">
                          <PhList size="17" />
                        </UiButton>
                      </div>
                      <div class="md:col-span-3">
                        <div class="font-bold md:pl-2">
                          {{ m.name }}
                        </div>
                      </div>
                      <div class="md:col-span-2">
                        <UiInput :id="`month-days-n${i}`" v-model="m.days" class="bg-transparent border-none" type="number" :name="`monthDays-n${i}`" placeholder="Nombre de jours" min="0" />
                      </div>
                      <div class="md:col-span-1">
                        jour(s)
                      </div>
                      <div class="md:col-start-12">
                        <UiTooltipProvider>
                          <UiTooltip>
                            <UiTooltipTrigger as-child>
                              <UiButton type="button" variant="ghost" size="icon" class="rounded-full h-8 w-8" @click="removeMonthFromCalendar(i)">
                                <PhTrash size="17" />
                              </UiButton>
                            </UiTooltipTrigger>
                            <UiTooltipContent>
                              <p>Supprimer {{ m.name }} du calendrier</p>
                            </UiTooltipContent>
                          </UiTooltip>
                        </UiTooltipProvider>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
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
