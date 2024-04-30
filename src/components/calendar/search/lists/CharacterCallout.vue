<script lang="ts" setup>
import type { Character } from '@/models/Characters'
import type { LeimDate } from '@/models/Date'
import { useCalendar } from '@/stores/CalendarStore'

defineProps<{
  character: Character
}>()

defineEmits<{
  (e: 'query:date-jump', payload: LeimDate): void
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
          <TooltipProvider :delayDuration="100">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  @click="$emit('query:date-jump', character.birth!)"
                  variant="ghost"
                  size="xs"
                >
                  <PhPlant size="16" weight="fill" />
                  {{ getFormattedDateTitle(character.birth, true) }}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Date de naissance</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <span v-if="character.birth && character.death">-</span>
        <li v-if="character.death">
          <TooltipProvider :delayDuration="100">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  @click="$emit('query:date-jump', character.death!)"
                  variant="ghost"
                  size="xs"
                >
                  <PhSkull size="16" weight="fill" />
                  {{ getFormattedDateTitle(character.death, true) }}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Date de décès</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </menu>

      <hr v-if="character.description" class="border-white opacity-25" />

      <div v-if="character.description" class="text-sm">
        <span class="opacity-75">
          {{ character.description }}
        </span>
      </div>
    </div>
  </div>
</template>
