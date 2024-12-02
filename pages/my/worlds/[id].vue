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

const markedCalendar = ref<Calendar | null>(null)
const isDeleteCalendarModalOpen = ref<boolean>(false)

function deployDeleteModal(calendar: Calendar) {
  isDeleteCalendarModalOpen.value = true
  markedCalendar.value = calendar
}

function hideDeleteModal() {
  isDeleteCalendarModalOpen.value = false
  markedCalendar.value = null
}
</script>

<template>
  <main class="p-8">
    <template v-if="pending">
      <Head>
        <Title>{{ $t("entity.world.namePlural") }}</Title>
      </Head>

      <Heading level="h1">
        {{ $t('entity.isLoading') }}
      </Heading>
    </template>
    <template v-else-if="world">
      <Head>
        <Title>{{ world.name }}</Title>
      </Head>

      <header class="lg:w-1/2 mb-8">
        <Spacing>
          <Heading level="h1">{{ world.name }}</Heading>

          <p>{{ world.description }}</p>
        </Spacing>
      </header>

      <section>
        <Spacing size="lg">
          <div class="flex items-center gap-3">
            <Heading level="h2">
              {{ $t('entity.calendar.namePlural') }}
            </Heading>

            <UiTooltipProvider :delay-duration="250">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton size="icon" class="rounded-full h-8 w-8" @click="() => isCreateCalendarModalOpen = true">
                    <PhPlus size="17"/>
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent :side-offset="10">
                  <p>
                    {{ $t('entity.calendar.addSingle') }}
                  </p>
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
              {{ $t('entity.calendar.notFoundForWorld') }}
            </p>
          </template>
        </Spacing>
      </section>
    </template>

    <CalendarDialogCreate :world :modal-state="isCreateCalendarModalOpen" @on-close="hideCreateDialog" />
    <CalendarDialogDelete :calendar="markedCalendar" :modal-state="isDeleteCalendarModalOpen" @on-close="hideDeleteModal" />
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
