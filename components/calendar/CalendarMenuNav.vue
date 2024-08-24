<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import { useCalendar } from '@/stores/CalendarStore'

import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhCaretLeft,
  PhCaretRight
} from '@phosphor-icons/vue'

interface DirectionLabels {
  pastFar: string
  pastNear: string
  futureNear: string
  futureFar: string
}

const { currentConfig, decrementViewMonth, incrementViewMonth, decrementViewYear, incrementViewYear } =
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
      decrementViewYear()
      break

    case 'year':
      decrementViewYear(10)
      break

    case 'decade':
      decrementViewYear(100)
      break

    case 'century':
    default:
      decrementViewYear(1000)
      break
  }
}

function toPastNear(): void {
  switch (currentConfig.viewType) {
    case 'month':
      decrementViewMonth()
      break

    case 'year':
      decrementViewYear()
      break

    case 'decade':
      decrementViewYear(10)
      break

    case 'century':
    default:
      decrementViewYear(100)
      break
  }
}

function toFutureNear(): void {
  switch (currentConfig.viewType) {
    case 'month':
      incrementViewMonth()
      break

    case 'year':
      incrementViewYear()
      break

    case 'decade':
      incrementViewYear(10)
      break

    case 'century':
    default:
      incrementViewYear(100)
      break
  }
}

function toFutureFar(): void {
  switch (currentConfig.viewType) {
    case 'month':
      incrementViewYear()
      break

    case 'year':
      incrementViewYear(10)
      break

    case 'decade':
      incrementViewYear(100)
      break

    case 'century':
    default:
      incrementViewYear(1000)
      break
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="icon" @click="toPastFar()">
            <PhCaretDoubleLeft size="18" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>{{ activeDirectionLabels.pastFar }}</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>

    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="icon" @click="toPastNear()">
            <PhCaretLeft size="18" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>{{ activeDirectionLabels.pastNear }}</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>

    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="icon" @click="toFutureNear()">
            <PhCaretRight size="18" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>{{ activeDirectionLabels.futureNear }}</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>

    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton variant="outline" size="icon" @click="toFutureFar()">
            <PhCaretDoubleRight size="18" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>{{ activeDirectionLabels.futureFar }}</p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </div>
</template>
