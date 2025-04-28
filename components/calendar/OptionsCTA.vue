<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core"
import { cn } from "~/lib/utils"
import { useCalendar } from "~/stores/CalendarStore"
import { PhCalendarBlank, PhCheckCircle, PhDotsThreeVertical, PhGear, PhTag } from "@phosphor-icons/vue"

const breakpoints = useBreakpoints(
  breakpointsTailwind
)

const { currentConfig, viewTypeOptions, getViewTypeTitle, setViewType, toggleCategoriesModal } = useCalendar()
const viewTypeTitle = computed(() => getViewTypeTitle(currentConfig.viewType))
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="secondary" size="icon">
        <ClientOnly>
          <PhGear v-if="breakpoints.md.value" size="20" weight="fill" />
          <PhDotsThreeVertical v-else size="26" weight="bold" />
        </ClientOnly>
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent :side="'bottom'" :align="'start'" :side-offset="10" :align-offset="25" :collision-padding="20" class="text-right">
      <UiDropdownMenuArrow />
      <UiDropdownMenuLabel>
        {{ $t('entity.calendar.seeOptions') }}
      </UiDropdownMenuLabel>

      <UiDropdownMenuItem
        v-if="!breakpoints.md.value"
        class="flex gap-[1ch] justify-end items-center"
        @click="toggleCategoriesModal(true)"
      >
        {{ $t('entity.calendar.seeCategories') }}

        <PhTag size="18" />
      </UiDropdownMenuItem>

      <UiDropdownMenuSub>
        <UiDropdownMenuSubTrigger arrow-direction="left" class="p-0 rounded-none">
          <UiDropdownMenuItem class="flex gap-[1ch] justify-end items-center pointer-events-none">
            {{ $t('ui.displayMode') }}

            <PhCalendarBlank size="18" weight="fill" />
          </UiDropdownMenuItem>
        </UiDropdownMenuSubTrigger>
        <UiDropdownMenuPortal>
          <UiDropdownMenuSubContent>
            <UiDropdownMenuItem
              v-for="option in viewTypeOptions"
              :key="option"
              class="flex gap-[.5ch] items-center rounded-none transition-colors"
              :class="cn({ 'text-emerald-600': viewTypeTitle === getViewTypeTitle(option) })"
              @click="setViewType(option)"
            >
              <PhCheckCircle v-if="viewTypeTitle === getViewTypeTitle(option)" size="20" weight="fill" />

              {{ getViewTypeTitle(option) }}
            </UiDropdownMenuItem>
          </UiDropdownMenuSubContent>
        </UiDropdownMenuPortal>
      </UiDropdownMenuSub>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
