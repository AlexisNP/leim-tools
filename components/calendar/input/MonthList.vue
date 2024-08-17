<script lang="ts" setup>
import { cn } from '~/lib/utils';

import { useSortable } from '@vueuse/integrations/useSortable';
import type { CalendarMonth } from '~/models/CalendarMonth';

import { PhList, PhPlus, PhTrash } from '@phosphor-icons/vue';

const model = defineModel<CalendarMonth[]>({ required: true })

/**
 * Input value for new month's name
 */
const monthName: Ref<string | undefined> = ref<string>()
const monthNameRef = ref<HTMLInputElement>()
const { focused: monthNameFocused } = useFocus(monthNameRef)
const validMonthNameDatatypes = ['string']
const monthNameIsTaken = computed(() => model.value.find(m => m.name === monthName.value))
const validMonthName = computed(() => validMonthNameDatatypes.includes(typeof monthName.value) && !monthNameIsTaken.value)

/**
 * Input value for new month's number of days
 */
const monthDays: Ref<number | undefined> = ref<number>()
const monthDaysRef = ref<HTMLInputElement>()
const validMonthDaysDatatypes = ['number']
const validMonthDays = computed(() => validMonthDaysDatatypes.includes(typeof monthDays.value) && monthDays.value && monthDays.value >= 12)

const validNewMonth = computed(() => validMonthDays.value && validMonthName.value)

/**
 * Add current month input data to the model list
 */
function addMonthToModel(): void {
  if (!monthDays.value || !monthName.value) return

  // Create month object to add
  const monthToInsert: CalendarMonth = {
    name: monthName.value,
    days: monthDays.value,
    position: model.value.length
  }

  model.value.push(monthToInsert)

  // Reset form state
  monthName.value = ''
  monthNameFocused.value = true
}

/**
 * Remove a specific month from the model
 *
 * @param index Index position of the month in the model
 */
function removeMonthFromModel(index: number) {
  if (isNaN(index)) return

  model.value.splice(index, 1)
}

// Sortable setup
const monthSortableList = ref<HTMLElement | null>(null)
useSortable(monthSortableList, model.value, { animation: 150, handle: ".handle" })
</script>

<template>
  <div class="grid md:grid-cols-12 gap-4 items-center">
    <div class="md:col-start-2 md:col-span-5">
      <UiInput id="new-month-name" ref="monthNameRef" v-model="monthName" type="text" name="newMonthName" placeholder="Nom du mois" :class="cn({ 'border-red-600': monthNameIsTaken })"/>
    </div>
    <div class="md:col-span-5">
      <UiInput id="new-month-days" ref="monthDaysRef" v-model="monthDays" type="number" name="newMonthName" placeholder="Nombre de jours" min="0" step="1" class="invalid:border-red-600" />
    </div>
    <div class="md:col-span-1">
      <UiButton size="icon" class="rounded-full h-8 w-8" :disabled="!validNewMonth" @click.prevent="addMonthToModel">
        <PhPlus size="17"/>
      </UiButton>
    </div>
    <div class="md:col-span-full">
      <div class="border-[1px] dark:border-slate-800 p-4 rounded-sm" :class="model.length ? 'md:grid md:grid-cols-12 md:gap-4 md:items-center' : ''">
          <div v-if="model.length" class="hidden md:block col-span-1">
            <ul class="grid gap-y-4 justify-center">
              <li v-for="(m, i) in model" :key="`num-${m.name}`">
                <UiButton size="icon" variant="secondary" class="h-8 w-8 rounded-full">
                  <span class="font-bold text-sm">{{ i + 1 }}</span>
                </UiButton>
              </li>
            </ul>
          </div>
          <div class="md:col-span-11">
            <ul ref="monthSortableList" class="grid gap-y-2" :class="model.length ? 'visible' : 'absolute invisible'">
              <template v-if="model.length">
                <li v-for="(m, i) in model" :key="m.name" class="grid md:grid-cols-12 gap-4 md:items-center text-slate-900 bg-slate-200 rounded-md">
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
                          <UiButton type="button" variant="ghost" size="icon" class="rounded-full h-8 w-8" @click="removeMonthFromModel(i)">
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
              </template>
            </ul>
          </div>
        <template v-if="!model.length">
          <p class="col-span-12 text-lg text-center italic opacity-50">Aucun mois pour l'instant</p>
        </template>
      </div>
    </div>
  </div>
</template>
