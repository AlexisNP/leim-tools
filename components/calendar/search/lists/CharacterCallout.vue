<script lang="ts" setup>
import type { Character } from '@/models/Characters'
import type { RPGDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { PhArrowSquareOut, PhPlant, PhSkull } from '@phosphor-icons/vue'

defineProps<{
  character: Character
}>()

defineEmits<{
  (e: 'query:date-jump', payload: RPGDate): void
}>()

const { getFormattedDateTitle } = useCalendar()
</script>

<template>
  <div class="block w-full text-left py-3 px-4 border-[1px] border-slate-700 rounded-sm">
    <div class="grid gap-2">
      <div class="flex gap-2">
        <h2 class="font-bold">
          {{ character.name }}
        </h2>
        <div v-if="character.wiki">
          <Button variant="link" size="xs" as-child>
            <a :href="character.wiki" target="_blank">
              Wiki
              <PhArrowSquareOut size="16" weight="fill" />
            </a>
          </Button>
        </div>
      </div>

      <menu class="flex gap-2 border-[1px] border-slate-700 rounded-sm w-fit">
        <li v-if="character.birth">
          <TooltipProvider :delay-duration="100">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  variant="ghost"
                  size="xs"
                  @click="$emit('query:date-jump', character.birth!)"
                >
                  <PhPlant size="16" weight="fill" />
                  {{ getFormattedDateTitle(character.birth, true) }}
                </Button>
              </TooltipTrigger>
              <TooltipContent :side="'bottom'" :align="'end'" :align-offset="20">
                <p>Date de naissance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <span v-if="character.birth && character.death">-</span>
        <li v-if="character.death">
          <TooltipProvider :delay-duration="100">
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  variant="ghost"
                  size="xs"
                  @click="$emit('query:date-jump', character.death!)"
                >
                  <PhSkull size="16" weight="fill" />
                  {{ getFormattedDateTitle(character.death, true) }}
                </Button>
              </TooltipTrigger>
              <TooltipContent :side="'bottom'" :align="'start'" :align-offset="20">
                <p>Date de décès</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </menu>

      <hr v-if="character.description" class="border-white opacity-25" >

      <div v-if="character.description" class="text-sm">
        <span class="opacity-75">
          {{ character.description }}
        </span>
      </div>
    </div>
  </div>
</template>
