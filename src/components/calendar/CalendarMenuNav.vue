<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { useCalendar } from '@/stores/CalendarStore'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhCaretLeft,
  PhCaretRight
} from '@phosphor-icons/vue'
import Button from '../ui/button/Button.vue'

interface DirectionLabels {
  pastFar: string
  pastNear: string
  futureNear: string
  futureFar: string
}

const { currentConfig, decrementMonth, incrementMonth, decrementYear, incrementYear } =
  useCalendar()

const activeDirectionLabels: ComputedRef<DirectionLabels> = computed(() => {
  switch (currentConfig.viewType) {
    case 'month':
      return {
        pastFar: 'Année précédente',
        pastNear: 'Mois précédent',
        futureNear: 'Mois suivant',
        futureFar: 'Année suivante'
      }

    case 'year':
      return {
        pastFar: 'Décennie précédente',
        pastNear: 'Année précédente',
        futureNear: 'Année suivante',
        futureFar: 'Décennie suivante'
      }

    case 'decade':
      return {
        pastFar: 'Siècle précédent',
        pastNear: 'Décennie précédente',
        futureNear: 'Décennie suivante',
        futureFar: 'Siècle suivant'
      }

    case 'century':
    default:
      return {
        pastFar: 'Millénaire précédent',
        pastNear: 'Siècle précédent',
        futureNear: 'Siècle suivant',
        futureFar: 'Millénaire suivant'
      }
  }
})

function toPastFar(): void {
  switch (currentConfig.viewType) {
    case 'month':
      decrementYear()
      break

    case 'year':
      decrementYear(10)
      break

    case 'decade':
      decrementYear(100)
      break

    case 'century':
    default:
      decrementYear(1000)
      break
  }
}

function toPastNear(): void {
  switch (currentConfig.viewType) {
    case 'month':
      decrementMonth()
      break

    case 'year':
      decrementYear()
      break

    case 'decade':
      decrementYear(10)
      break

    case 'century':
    default:
      decrementYear(100)
      break
  }
}

function toFutureNear(): void {
  switch (currentConfig.viewType) {
    case 'month':
      incrementMonth()
      break

    case 'year':
      incrementYear()
      break

    case 'decade':
      incrementYear(10)
      break

    case 'century':
    default:
      incrementYear(100)
      break
  }
}

function toFutureFar(): void {
  switch (currentConfig.viewType) {
    case 'month':
      incrementYear()
      break

    case 'year':
      incrementYear(10)
      break

    case 'decade':
      incrementYear(100)
      break

    case 'century':
    default:
      incrementYear(1000)
      break
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="toPastFar()">
            <PhCaretDoubleLeft size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ activeDirectionLabels.pastFar }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="toPastNear()">
            <PhCaretLeft size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ activeDirectionLabels.pastNear }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="toFutureNear()">
            <PhCaretRight size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ activeDirectionLabels.futureNear }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider :delayDuration="250">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" size="icon" @click="toFutureFar()">
            <PhCaretDoubleRight size="18" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ activeDirectionLabels.futureFar }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
