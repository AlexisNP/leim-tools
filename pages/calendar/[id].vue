<script lang="ts" setup>
import type { MenuItem } from '~/components/global/SidebarProps';

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

const sidebarMenu: MenuItem[] = []

const route = useRoute()
const worldId = route.params.id

const { setMonths } = useCalendar()
const { months } = storeToRefs(useCalendar())

const { data: calendar, pending, refresh } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)

if (calendar.value?.data?.months) {
  if (!calendar.value) {
    await refresh()
  } else {
    setMonths(calendar.value?.data?.months)
  }
}
</script>

<template>
  <div class="h-full grid grid-cols-[auto_1fr]">
    <Sidebar :menu-items="sidebarMenu" />

    <template v-if="pending">
      Loading là
    </template>
    <template v-else>
      <Calendar />
    </template>
  </div>
</template>
