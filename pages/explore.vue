<script lang="ts" setup>
import type { Calendar } from "~/models/CalendarConfig";

const { data: availableCalendars } = await useLazyFetch<{ data: Calendar[] }>("/api/calendars/query", { key: "explore-calendars", query: { full: true } })
</script>

<template>
  <main class="p-8">
    <Head>
      <Title>{{ $t("pages.explore.title") }}</Title>
    </Head>

    <Spacing size="lg">
      <Heading level="h1">
        {{ $t("pages.explore.title") }}
      </Heading>

      <Spacing size="lg">
        <Heading level="h2">
          {{ $t("entity.calendar.namePublicPlural") }}
        </Heading>

        <ul v-if="availableCalendars?.data" class="grid md:grid-cols-3 gap-2">
          <li v-for="calendar in availableCalendars.data" :key="calendar.shortId">
            <CalendarPreviewCard :calendar="calendar" :gm-id="calendar.world?.gmId" />
          </li>
        </ul>
      </Spacing>
    </Spacing>
  </main>
</template>
