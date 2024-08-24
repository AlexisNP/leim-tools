<script lang="ts" setup>
import { PhPlus } from '@phosphor-icons/vue';
import type { World } from '~/models/World';

const route = useRoute()
const id = route.params.id

const { data: res, pending } = await useFetch('/api/worlds/query', { query: { id, full: true } })

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

const alertModalOpened = ref<boolean>(false)
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

      <section>
        <Spacing size="lg">
          <div class="flex items-center gap-3">
            <Heading>Calendriers</Heading>

            <UiTooltipProvider :delay-duration="250">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton size="icon" class="rounded-full h-8 w-8" @click="() => alertModalOpened = true">
                    <PhPlus size="17"/>
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent>
                  <p>Ajouter un calendrier</p>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>

          <ul v-if="world.calendars && world.calendars?.length > 0" class="grid md:grid-cols-3 gap-2">
            <li v-for="calendar in world.calendars" :key="calendar.id">
              <UiCard
                v-if="calendar"
                class="w-full transition-all text-slate-100 bg-slate-900 border-slate-700 hover:bg-slate-700 dark:hover:bg-slate-800 dark:border-slate-900 dark:focus-within:outline-slate-900"
                :link="`/i/calendar/${calendar.id}`"
              >
                <UiCardHeader>
                  <UiCardTitle>{{ calendar.name }}</UiCardTitle>
                </UiCardHeader>

                <UiCardContent>
                  <p class="italic">Description future (ou alors des informations sur le nb d'évènements)</p>
                </UiCardContent>
              </UiCard>
            </li>
          </ul>
          <template v-else>
            <p class="pl-6 opacity-75 italic">
              Aucun calendrier pour ce monde
            </p>
          </template>
        </Spacing>
      </section>
    </template>

    <CalendarDialogCreate :world :modal-state="alertModalOpened" />
  </main>
</template>
