<script lang="ts" setup>
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { World } from "~/models/World";
import type { Calendar } from "~/models/CalendarConfig";
import { PhPlus, PhTrash } from "@phosphor-icons/vue";

const supabase = useSupabaseClient()
const route = useRoute()
const id = route.params.id

const { data: res, pending } = await useFetch("/api/worlds/query", { query: { id, full: true } })

const world = ref<World>(res.value?.data as World)

if (world.value) {
  useHead({
    title: world.value.name
  })
}

watch(world, (n) => {
  if (n) {
    useHead({
      title: n.name
    })
  }
}, { deep: true })

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

const isCreateEventModalOpen = ref<boolean>(false)

function hideCreateDialog() {
  isCreateEventModalOpen.value = false
}

/**
 * === Calendar subscriptions ===
 */

/** Active calendar channel */
let calendarChannel: RealtimeChannel

/** Handles calendar insertion realtime events */
function handleInsertedCalendar(newCalendar: Calendar) {
  try {
    world.value.calendars?.push(newCalendar)
  } catch (err) {
    console.log(err)
  }
}

/** Handles calendar deletion realtime events */
function handleDeletedCalendar(id: number) {
  try {
    world.value.calendars?.splice(world.value.calendars.findIndex(c => c.id === id))
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  calendarChannel = supabase.channel("custom-insert-channel")
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

const markedCalendar = ref<Calendar | null>(null)
const isDeleteEventModalOpen = ref<boolean>(false)

function deployDeleteModal(calendar: Calendar) {
  isDeleteEventModalOpen.value = true
  markedCalendar.value = calendar
}

function hideDeleteModal() {
  isDeleteEventModalOpen.value = false
  markedCalendar.value = null
}
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
                  <UiButton size="icon" class="rounded-full h-8 w-8" @click="() => isCreateEventModalOpen = true">
                    <PhPlus size="17"/>
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent :side-offset="10">
                  <p>Ajouter un calendrier</p>
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>

          <ul v-if="world.calendars && world.calendars?.length > 0" class="grid md:grid-cols-3 gap-2">
            <li v-for="calendar in world.calendars" :key="calendar.id">
              <UiCard
                class="w-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
                :link="`/my/calendars/${calendar.id}`"
              >
                <UiCardHeader>
                  <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
                </UiCardHeader>

                <UiCardContent>
                  <p class="italic">Description future (ou alors des informations sur le nb d'évènements)</p>

                  <UiButton size="icon" variant="ghost" class="absolute top-2 right-2 z-20 hover:text-white hover:bg-rose-400 dark:hover:bg-rose-700" @click="deployDeleteModal(calendar)">
                    <PhTrash size="16" />
                  </UiButton>
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

    <CalendarDialogCreate :world :modal-state="isCreateEventModalOpen" @on-close="hideCreateDialog" />
    <CalendarDialogDelete :calendar="markedCalendar" :modal-state="isDeleteEventModalOpen" @on-close="hideDeleteModal" />
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  isolation: isolate;
  overflow: clip;

  &::after {
    display: block;
    content: '';
    position: absolute;
    right: 2.4rem;
    bottom: -5%;
    height: 75%;
    width: 100%;
    background-image: url('/images/planet.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-position-x: right;
    z-index: -1;
    mask-image: radial-gradient(ellipse 100% 100% at 120% 80%, black, transparent);
    opacity: .3;
  }
}
</style>
