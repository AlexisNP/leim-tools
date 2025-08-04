<script lang="ts" setup>
import { PhTag } from "@phosphor-icons/vue"

const { toggleCategoriesModal } = useCalendar()
const { isReadOnly } = storeToRefs(useCalendar())
</script>

<template>
  <ClientOnly>
    <UiTooltipProvider :delay-duration="250">
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiButton v-if="!isReadOnly" variant="secondary" size="icon" @click="toggleCategoriesModal(true)">
            <PhTag size="20" weight="light" />
          </UiButton>
        </UiTooltipTrigger>
        <UiTooltipContent>
          <p>
            {{ $t('entity.calendar.seeCategories') }}
          </p>
        </UiTooltipContent>
      </UiTooltip>
    </UiTooltipProvider>
  </ClientOnly>
</template>
