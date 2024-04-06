<script lang="ts" setup>
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useCalendar } from '@/stores/calendar'
import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhCaretLeft,
  PhCaretRight
} from '@phosphor-icons/vue'
import Button from '../ui/button/Button.vue'

const { decrementMonth, incrementMonth, decrementYear, incrementYear } = useCalendar()
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Implement decrementDate to account for other mods -->
    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="decrementYear()">
            <PhCaretDoubleLeft size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Année précédente</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="decrementMonth()">
            <PhCaretLeft size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mois précédent</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="incrementMonth()">
            <PhCaretRight size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mois suivant</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="incrementYear()">
            <PhCaretDoubleRight size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Année suivante</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
