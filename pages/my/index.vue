<script lang="ts" setup>
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { World, WorldChannelPayload } from "~/models/World";

const supabase = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  middleware: ["auth-guard", "reset-menu"]
})

const { data: worlds } = await useLazyFetch<{ data: World[] }>("/api/worlds/query", { query: { gmId:  user?.value!.id } })
const sortedWorlds = computed(() => worlds.value?.data ? [...worlds.value.data].sort((a, b) => (a.id ?? 0) - (b.id ?? 0)) : [])

// Redirect user back home when they log out on the page
watch(user, (n) => {
  if (!n) {
    navigateTo("/")
  }
})

const isCreateWorldModalOpen = ref<boolean>(false)

function hideCreateDialog() {
  isCreateWorldModalOpen.value = false
}

/**
 * === World subscriptions ===
 */
/** Active world channel */
let worldChannel: RealtimeChannel

/** Handles world insertion realtime events */
function handleInsertedWorld(newWorld: WorldChannelPayload) {
  if (!worlds.value?.data) return

  newWorld.createdAt = newWorld.created_at;
  newWorld.gmId = newWorld.gm_id;

  try {
    worlds.value?.data.push(newWorld)
  } catch (err) {
    console.log(err)
  }
}

/** Handles world deletion realtime events */
function handleDeletedWorld(id: number) {
  if (!worlds.value?.data) return

  try {
    worlds.value.data.splice(worlds.value.data.findIndex(w => w.id === id), 1)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  worldChannel = supabase.channel("realtime-world-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "worlds" },
      async (payload) => {
        switch (payload.eventType) {
          case "INSERT":
            handleInsertedWorld(payload.new as World)
            break

          case "DELETE":
            handleDeletedWorld(payload.old.id)
            break

          case "UPDATE":
            if (!worlds.value?.data) return

            worlds.value.data = (await $fetch("/api/worlds/query", { query: { gmId: user?.value!.id } })).data as World[]
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

const markedWorld = ref<World | null>(null)
const isEditWorldModalOpen = ref<boolean>(false)
const isDeleteWorldModalOpen = ref<boolean>(false)

function deployDeleteModal(world: World) {
  isDeleteWorldModalOpen.value = true
  markedWorld.value = world
}

function hideDeleteModal() {
  isDeleteWorldModalOpen.value = false
  markedWorld.value = null
}

function deployEditModal(world: World) {
  isEditWorldModalOpen.value = true
  markedWorld.value = world
}

function hideEditModal() {
  isEditWorldModalOpen.value = false
  markedWorld.value = null
}
</script>

<template>
  <main class="p-8">
    <Head>
      <Title>{{ $t("pages.profile.metaTitle") }}</Title>
    </Head>

    <Heading level="h1">
      {{ $t("pages.profile.title", { user: user?.user_metadata.full_name }) }}
    </Heading>

    <section class="mt-4">
      <Spacing size="lg">
        <div class="flex items-center gap-3">
          <Heading level="h2">
            {{ $t('entity.world.namePlural') }}
          </Heading>
        </div>

        <ul v-if="worlds?.data" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          <li v-for="world in sortedWorlds" :key="world.id">
            <WorldPreviewCard :world="world" @on-edit="() => deployEditModal(world)" @on-delete="() => deployDeleteModal(world)" />
          </li>
          <li class="xl:w-fit">
            <AddCard @on-click="() => isCreateWorldModalOpen = true">
              <template v-if="worlds?.data?.length > 0">
                {{ $t('entity.world.addSingle') }}
              </template>
              <template v-else>
                {{ $t('entity.world.addSingleFirst') }}
              </template>
            </AddCard>
          </li>
        </ul>
      </Spacing>
    </section>

    <LazyWorldDialogCreate :modal-state="isCreateWorldModalOpen" @on-close="hideCreateDialog" />
    <LazyWorldDialogEdit :world="markedWorld" :modal-state="isEditWorldModalOpen" @on-close="hideEditModal" />
    <LazyWorldDialogDelete :world="markedWorld" :modal-state="isDeleteWorldModalOpen" @on-close="hideDeleteModal" />
  </main>
</template>
