<script lang="ts" setup>
import { useCalendar } from '@/stores/CalendarStore'

import { PhList, PhHouse, PhMagnifyingGlass } from '@phosphor-icons/vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Button from '../ui/button/Button.vue'

const { revealAdvancedSearch } = useCalendar()
</script>

<template>
  <nav class="w-16 py-6 border-r-[1px] border-l-slate-500 grid justify-center">
    <menu class="flex flex-col gap-4">
      <li class="mb-12">
        <Button variant="ghost" size="icon" class="rounded-full" @click="console.log">
          <PhList size="27" />
        </Button>
      </li>
      <li>
        <TooltipProvider :delay-duration="100">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="ghost" size="icon" class="rounded-full" as-child>
                <RouterLink to="/">
                  <PhHouse size="24" weight="fill" />
                </RouterLink>
              </Button>
            </TooltipTrigger>
            <TooltipContent :side="'right'">
              <p>Retourner aux outils</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
      <li>
        <TooltipProvider :delay-duration="100">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="rounded-full"
                @click="revealAdvancedSearch()"
              >
                <PhMagnifyingGlass size="24" weight="fill" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side="'right'">
              <p>Recherche avancée</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    </menu>
  </nav>
</template>
