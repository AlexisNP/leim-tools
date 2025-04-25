<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core"
import { PhMagnifyingGlass } from "@phosphor-icons/vue"

const { revealAdvancedSearch, } = useCalendar()

const breakpoints = useBreakpoints(
  breakpointsTailwind
)
</script>

<template>
  <ClientOnly>
    <UiButton
      :search-slash="breakpoints.lg.value"
      :size="breakpoints.lg.value ? 'default' : 'icon'"
      @click="revealAdvancedSearch()"
    >
      <PhMagnifyingGlass size="20" weight="light" />

      <span class="max-lg:hidden">
        {{ $t('entity.advancedSearch.title') }}
      </span>
    </UiButton>
  </ClientOnly>
</template>
