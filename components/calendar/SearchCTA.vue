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
    <Transition name="fade" appear>
      <UiButton
        :search-slash="breakpoints.lg.value"
        :size="breakpoints.lg.value ? 'default' : 'icon'"
        @click="revealAdvancedSearch()"
      >
        <PhMagnifyingGlass size="20" weight="light" />

        <span v-if="breakpoints.lg.value">
          {{ $t('entity.advancedSearch.title') }}
        </span>
      </UiButton>
    </Transition>
  </ClientOnly>
</template>
