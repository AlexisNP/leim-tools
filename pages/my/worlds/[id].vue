<script lang="ts" setup>
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { World } from "~/models/World";
import type { Calendar } from "~/models/CalendarConfig";
import { PhArrowBendDoubleUpLeft, PhGlobeHemisphereWest, PhPencil, PhTrash } from "@phosphor-icons/vue";

const supabase = useSupabaseClient()
const route = useRoute()
const id = route.params.id

const { data: world, status } = await useFetch<{ data: World }>("/api/worlds/query", { query: { id, full: true } })

definePageMeta({
  middleware: ["auth-guard"]
})

const user = useSupabaseUser()

// Redirect user back home when they log out on the page
watch(user, (n) => {
  if (!n) {
    navigateTo("/")
  }
})

const isCreateCalendarModalOpen = ref<boolean>(false)

function hideCreateDialog() {
  isCreateCalendarModalOpen.value = false
}

/**
 * === Subscriptions ===
 */

/** Active calendar channel */
let calendarChannel: RealtimeChannel
/** Active world channel */
let worldChannel: RealtimeChannel

/** Handles calendar insertion realtime events */
function handleInsertedCalendar(newCalendar: Calendar) {
  if (!world.value) return

  try {
    world.value.data.calendars?.push(newCalendar)
  } catch (err) {
    console.log(err)
  }
}

/** Handles calendar deletion realtime events */
function handleDeletedCalendar(id: number) {
  if (!world.value) return

  try {
    world.value.data.calendars?.splice(world.value.data.calendars.findIndex(c => c.id === id))
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  calendarChannel = supabase.channel("realtime-calendar-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "calendars" },
      (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            handleInsertedCalendar(payload.new as Calendar)
            break

          case "DELETE":
            handleDeletedCalendar(payload.old.id)
            break

          default:
            console.log("Unknown event has been triggered. This should not happen unless Supabase added one somehow.")
            break
        }
      }
    )
    .subscribe()
})
onUnmounted(() => {
  // Unsubscribe from realtime
  supabase.removeChannel(calendarChannel)
})

onMounted(() => {
  worldChannel = supabase.channel("realtime-world-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "worlds" },
      async (payload) => {
        switch (payload.eventType) {
          case "UPDATE":
            if (!world.value?.data) return

            world.value.data = (await $fetch<{ data: World }>("/api/worlds/query", { query: { id, full: true } })).data
            break

          default:
            console.log("Unknown event has been triggered. This should not happen unless Supabase added one somehow.")
            console.log(payload)
            break
        }
      }
    )
    .subscribe()
})
onUnmounted(() => {
  // Unsubscribe from realtime
  supabase.removeChannel(worldChannel)
})

const markedCalendar = ref<Calendar | null>(null)
const isDeleteCalendarModalOpen = ref<boolean>(false)
const isEditWorldModalOpen = ref<boolean>(false)

function deployDeleteCalendarModal(calendar: Calendar) {
  isDeleteCalendarModalOpen.value = true
  markedCalendar.value = calendar
}

function hideDeleteCalendarModal() {
  isDeleteCalendarModalOpen.value = false
  markedCalendar.value = null
}

function deployEditModal() {
  isEditWorldModalOpen.value = true
}

function hideEditModal() {
  isEditWorldModalOpen.value = false
}
</script>

<template>
  <main class="p-8">
    <template v-if="status === 'pending'">
      <Head>
        <Title>{{ $t("entity.world.namePlural") }}</Title>
      </Head>

      <Heading level="h1">
        {{ $t('entity.isLoading') }}
      </Heading>
    </template>
    <template v-else-if="world?.data">
      <Head>
        <Title>{{ world.data.name }}</Title>
      </Head>

      <header class="lg:w-1/2 mb-8">
        <Spacing>
          <div class="flex items-center gap-2">
            <Heading level="h1">{{ world.data.name }}</Heading>

            <UiTooltipProvider :delay-duration="250">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton size="icon" class="rounded-full h-8 w-8" @click="deployEditModal">
                    <PhPencil size="17" weight="fill" />
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent :side-offset="12" side="right">
                  <p>
                    {{ $t('entity.world.editSingle') }}
                  </p>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>

          <p>{{ world.data.description }}</p>
        </Spacing>
      </header>

      <section>
        <Spacing size="lg">
          <div class="flex items-center gap-3">
            <Heading level="h2">
              {{ $t('entity.calendar.namePlural') }}
            </Heading>
          </div>

          <ul v-if="world.data.calendars && world.data.calendars?.length > 0" class="grid md:grid-cols-3 gap-2">
            <li v-for="calendar in world.data.calendars" :key="calendar.id">
              <UiCard
                class="w-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
                :link="`/my/calendars/${calendar.id}`"
              >
                <UiCardHeader>
                  <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
                </UiCardHeader>

                <UiCardContent>
                  <p class="italic">Description future (ou alors des informations sur le nb d'évènements)</p>

                  <UiButton size="icon" variant="ghost" class="absolute top-2 right-2 z-20 hover:text-white hover:bg-rose-400 dark:hover:bg-rose-700" @click="deployDeleteCalendarModal(calendar)">
                    <PhTrash size="16" />
                  </UiButton>
                </UiCardContent>
              </UiCard>
            </li>
            <li class="w-fit">
              <AddCard @on-click="() => isCreateCalendarModalOpen = true">
                {{ $t('entity.calendar.addSingle') }}
              </AddCard>
            </li>
          </ul>
          <template v-else>
            <p class="pl-6 opacity-75 italic">
              {{ $t('entity.calendar.notFoundForWorld') }}
            </p>
          </template>
        </Spacing>
      </section>

      <WorldDialogEdit :world="world.data" :modal-state="isEditWorldModalOpen" @on-close="hideEditModal" />
      <CalendarDialogCreate :world="world.data" :modal-state="isCreateCalendarModalOpen" @on-close="hideCreateDialog" />
      <CalendarDialogDelete :calendar="markedCalendar" :modal-state="isDeleteCalendarModalOpen" @on-close="hideDeleteCalendarModal"/>
    </template>
    <template v-else>
      <div class="h-full w-full grid place-items-center">
        <Head>
          <Title>{{ $t("entity.world.notFound") }}</Title>
        </Head>

        <div class="grid justify-items-center opacity-80">
          <PhGlobeHemisphereWest size="75" class="opacity-60" weight="fill" />

          <Heading level="h1">
            {{ $t("entity.world.notFound") }}
          </Heading>

          <p>
            {{ $t('entity.world.notFoundDescription') }}
          </p>

          <UiButton variant="default" class="mt-4 gap-2" as-child>
            <RouterLink to="/my">
              <PhArrowBendDoubleUpLeft size="24" />

              {{ $t('entity.world.backToList') }}
            </RouterLink>
          </UiButton>
        </div>
      </div>
    </template>
  </main>
</template>
