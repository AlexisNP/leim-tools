<script lang="ts" setup>
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

const route = useRoute()
const id = route.params.id
const calendarStore = useCalendar()

const { pending: calendarPending } = await useAsyncData('calendar', async () => await calendarStore.fetchCalendar(Number(id)))
</script>

<template>
  <Calendar v-if="!calendarPending" />
</template>
