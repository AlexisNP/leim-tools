<script lang="ts" setup>
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { World } from "~/models/World";
import type { Calendar, CalendarChannelPayload } from "~/models/CalendarConfig";
import { PhArrowBendDoubleUpLeft, PhGlobeHemisphereWest, PhPencil } from "@phosphor-icons/vue";

const supabase = useSupabaseClient()
const route = useRoute()
const id = route.params.id

const { data: world, status } = await useFetch<{ data: World }>("/api/worlds/query", { query: { id, full: true } })
const sortedCalendars = computed(() => world.value?.data.calendars ? [...world.value.data.calendars].sort((a, b) => (a.id ?? 0) - (b.id ?? 0)) : [])

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

/**
 * === Subscriptions ===
 */

/** Active calendar channel */
let calendarChannel: RealtimeChannel
/** Active world channel */
let worldChannel: RealtimeChannel

/** Handles calendar insertion realtime events */
function handleInsertedCalendar(newCalendar: CalendarChannelPayload) {
  if (!world.value) return

  newCalendar.createdAt = newCalendar.created_at;
  newCalendar.eventNb = [{ count: 0 }];

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
    world.value.data.calendars?.splice(world.value.data.calendars.findIndex(c => c.id === id), 1)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  calendarChannel = supabase.channel("realtime-calendar-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "calendars" },
      async (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            handleInsertedCalendar(payload.new as Calendar)
            break

          case "DELETE":
            handleDeletedCalendar(payload.old.id)
            break

          // Maybe this case could be handled better than doing a separate API call
          case "UPDATE":
            if (!world.value?.data) return

            world.value.data = (await $fetch<{ data: World }>("/api/worlds/query", { query: { id, full: true } })).data
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
const isEditWorldModalOpen = ref<boolean>(false)

const isCreateCalendarModalOpen = ref<boolean>(false)
const isUpdateCalendarModalOpen = ref<boolean>(false)
const isDeleteCalendarModalOpen = ref<boolean>(false)

function hideCreateDialog() {
  isCreateCalendarModalOpen.value = false
}

function deployUpdateDialog(calendar: Calendar) {
  markedCalendar.value = calendar
  isUpdateCalendarModalOpen.value = true
}
function hideUpdateDialog() {
  isUpdateCalendarModalOpen.value = false
}

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

          <ul class="grid md:grid-cols-3 gap-2">
            <li v-for="calendar in sortedCalendars" :key="calendar.id">
              <CalendarPreviewCard
                :calendar="calendar"
                :gm-id="world.data.gmId"
                show-actions
                @on-edit="() => deployUpdateDialog(calendar)"
                @on-delete="() => deployDeleteCalendarModal(calendar)" />
            </li>

            <li class="md:w-fit">
              <AddCard @on-click="() => isCreateCalendarModalOpen = true">
                <template v-if="sortedCalendars.length > 0">
                  {{ $t('entity.calendar.addSingle') }}
                </template>
                <template v-else>
                  {{ $t('entity.calendar.addSingleFirst') }}
                </template>
              </AddCard>
            </li>
          </ul>
        </Spacing>
      </section>

      <WorldDialogEdit :world="world.data" :modal-state="isEditWorldModalOpen" @on-close="hideEditModal" />
      <CalendarDialogCreate :world="world.data" :modal-state="isCreateCalendarModalOpen" @on-close="hideCreateDialog" />
      <CalendarDialogUpdate v-if="markedCalendar?.id" :world="world.data" :calendar="markedCalendar" :modal-state="isUpdateCalendarModalOpen" @on-close="hideUpdateDialog" />
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
