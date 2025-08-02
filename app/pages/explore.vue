<script lang="ts" setup>
import type { Calendar } from "@@/models/CalendarConfig";

definePageMeta({
  middleware: ["reset-menu"]
})

// const { data: availableCalendars, status: calendarStatus } = useLazyFetch<{ data: Calendar[] }>("/api/calendars/query", { key: "explore-calendars", query: { full: true } })
const { data: calendars, status } = useLazyAsyncData<{ data: Calendar[] }>("explore-calendars", () => {
  return $fetch("/api/calendars/query", { query: { full: true }})
})
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

          <div v-if="status === 'pending'" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            <LazyCardLoading />
          </div>

          <template v-else-if="status === 'success' && calendars?.data">
            <ul class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              <li v-for="calendar in calendars.data" :key="calendar.shortId">
                <LazyCalendarPreviewCard :calendar="calendar" :gm-id="calendar.world?.gmId" />
              </li>
            </ul>
          </template>
      </Spacing>
    </Spacing>
  </main>
</template>
