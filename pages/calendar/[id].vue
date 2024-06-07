<script lang="ts" setup>
import { PhMagnifyingGlass } from '@phosphor-icons/vue';

useHead({
  title: 'Calendrier'
})
definePageMeta({
  middleware: ['auth-guard']
})

const user = useSupabaseUser()
// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})

const { setCurrentMenu } = useUiStore()
const { revealAdvancedSearch } = useCalendar()

setCurrentMenu([
  {
    phIcon: PhMagnifyingGlass,
    tooltip: 'Recherche avancée',
    clickHandler: revealAdvancedSearch
  }
])
</script>

<template>
  <Calendar />
</template>
