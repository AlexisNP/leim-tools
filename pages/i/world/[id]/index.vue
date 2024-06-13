<script lang="ts" setup>
import type { World } from '~/models/World';

const route = useRoute()
const id = route.params.id

const { data: res, pending } = await useFetch(`/api/worlds/query`, { query: { id, full: true } })

const world = res.value?.data as World

useHead({
  title: 'Profil'
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
setCurrentMenu([])
</script>

<template>
  <main class="p-8">
    <template v-if="pending">
      <Heading>Chargement...</Heading>
    </template>
    <template v-else-if="world">
      <header class="lg:w-1/2 mb-8">
        <Spacing>
          <Heading>{{ world.name }}</Heading>

          <p>{{ world.description }}</p>
        </Spacing>
      </header>

      <ul v-if="world.calendars && world.calendars?.length > 0" class="grid md:grid-cols-3 gap-2">
        <li v-for="calendar in world.calendars" :key="calendar.id">
          <UiCard
            v-if="calendar"
            class="w-full transition-all"
            :link="`/i/world/${world.id}/calendar`"
          >
            <UiCardHeader>
              <UiCardTitle>{{ calendar.name }}</UiCardTitle>

              <UiCardContent>
                <p class="italic">{{ calendar.events }}</p>
              </UiCardContent>
            </UiCardHeader>
          </UiCard>
        </li>
      </ul>
    </template>
  </main>
</template>
