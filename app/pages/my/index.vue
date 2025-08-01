<script lang="ts" setup>
import type { RealtimeChannel } from "@supabase/supabase-js"
import type { World, WorldChannelPayload } from "@@/models/World";

const supabase = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({
  middleware: ["auth-guard", "reset-menu"]
})

const { data: worlds, status: worldStatus, refresh } = await useLazyFetch<{ data: World[] }>("/api/worlds/query", { query: { gmId:  user?.value!.id }, key: "user-worlds", keepalive: true })
const sortedWorlds = computed(() => worlds.value?.data ? worlds.value.data.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)) : [])

const isLoading = computed(() => worldStatus.value === "pending")

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

onMounted(() => {
  worldChannel = supabase.channel("realtime-worlds-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "worlds" },
      async (payload) => {
        refresh()
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
  <main class="py-8 px-5 md:px-8">
    <Head>
      <Title>{{ $t("pages.profile.metaTitle") }}</Title>
    </Head>

    <div class="flex items-center gap-3">
      <div class="md:hidden">
        <SidebarToggle />
      </div>

      <Heading level="h1">
        {{ $t("pages.profile.title", { user: user?.user_metadata.full_name }) }}
      </Heading>
    </div>

    <section class="mt-4">
      <Spacing size="lg">
        <div class="flex items-center gap-3">
          <Heading level="h2">
            {{ $t('entity.world.namePlural') }}
          </Heading>
        </div>

        <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          <LoadingCard />
        </div>
        <ul v-else-if="worlds?.data" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
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

    <WorldDialogCreate :modal-state="isCreateWorldModalOpen" @on-close="hideCreateDialog" />
    <WorldDialogEdit :world="markedWorld" :modal-state="isEditWorldModalOpen" @on-close="hideEditModal" />
    <WorldDialogDelete :world="markedWorld" :modal-state="isDeleteWorldModalOpen" @on-close="hideDeleteModal" />
  </main>
</template>
