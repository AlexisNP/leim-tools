<script lang="ts" setup>
import { computed, type ComputedRef } from "vue"
import { useCalendar } from "@/stores/CalendarStore"

import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhCaretLeft,
  PhCaretRight
} from "@phosphor-icons/vue"

const { t } = useI18n()

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
    case "month":
      return {
        pastFar: t("entity.calendar.years.prevSingular"),
        pastNear: t("entity.calendar.months.prevSingular"),
        futureNear: t("entity.calendar.months.nextSingular"),
        futureFar: t("entity.calendar.years.nextSingular")
      }

    case "year":
      return {
        pastFar: t("entity.calendar.decades.prevSingular"),
        pastNear: t("entity.calendar.years.prevSingular"),
        futureNear: t("entity.calendar.years.nextSingular"),
        futureFar: t("entity.calendar.decades.nextSingular")
      }

    case "decade":
      return {
        pastFar: t("entity.calendar.centuries.prevSingular"),
        pastNear: t("entity.calendar.decades.prevSingular"),
        futureNear: t("entity.calendar.decades.nextSingular"),
        futureFar: t("entity.calendar.centuries.nextSingular")
      }

    case "century":
    default:
      return {
        pastFar: t("entity.calendar.millenias.prevSingular"),
        pastNear: t("entity.calendar.centuries.prevSingular"),
        futureNear: t("entity.calendar.centuries.nextSingular"),
        futureFar: t("entity.calendar.millenias.nextSingular")
      }
  }
})

function toPastFar(): void {
  switch (currentConfig.viewType) {
    case "month":
      decrementViewYear()
      break

    case "year":
      decrementViewYear(10)
      break

    case "decade":
      decrementViewYear(100)
      break

    case "century":
    default:
      decrementViewYear(1000)
      break
  }
}

function toPastNear(): void {
  switch (currentConfig.viewType) {
    case "month":
      decrementViewMonth()
      break

    case "year":
      decrementViewYear()
      break

    case "decade":
      decrementViewYear(10)
      break

    case "century":
    default:
      decrementViewYear(100)
      break
  }
}

function toFutureNear(): void {
  switch (currentConfig.viewType) {
    case "month":
      incrementViewMonth()
      break

    case "year":
      incrementViewYear()
      break

    case "decade":
      incrementViewYear(10)
      break

    case "century":
    default:
      incrementViewYear(100)
      break
  }
}

function toFutureFar(): void {
  switch (currentConfig.viewType) {
    case "month":
      incrementViewYear()
      break

    case "year":
      incrementViewYear(10)
      break

    case "decade":
      incrementViewYear(100)
      break

    case "century":
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
