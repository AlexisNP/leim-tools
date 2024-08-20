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

const { pending: calendarPending } = await useAsyncData('calendar', () => calendarStore.fetchCalendar(Number(id)).then(() => true))
</script>

<template>
  <Calendar v-if="!calendarPending" />
</template>
