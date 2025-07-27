<script lang="ts" setup>
import type { Calendar } from "@@/models/CalendarConfig";

definePageMeta({
  middleware: ["reset-menu"]
})

const { data: availableCalendars, status: calendarStatus } = useLazyFetch<{ data: Calendar[] }>("/api/calendars/query", { key: "explore-calendars", query: { full: true } })

const isLoading = computed(() => calendarStatus.value === "pending")
</script>

<template>
  <main class="py-8 px-5 md:px-8">
    <Head>
      <Title>{{ $t("pages.explore.title") }}</Title>
    </Head>

    <Spacing size="lg">
      <div class="flex items-center gap-3">
        <div class="md:hidden">
          <SidebarToggle />
        </div>

        <Heading level="h1">
          {{ $t("pages.explore.title") }}
        </Heading>
      </div>

      <Spacing size="lg">
        <Heading level="h2">
          {{ $t("entity.calendar.namePublicPlural") }}
        </Heading>

          <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            <LoadingCard />
          </div>
          <ul v-else-if="availableCalendars?.data" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            <li v-for="calendar in availableCalendars.data" :key="calendar.shortId">
              <CalendarPreviewCard :calendar="calendar" :gm-id="calendar.world?.gmId" />
            </li>
          </ul>
      </Spacing>
    </Spacing>
  </main>
</template>
