<script lang="ts" setup>
import { PhCalendarDots } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";

const { data: availableCalendars } = await useLazyFetch<{ data: Calendar[] }>("/api/calendars/query", { key: "explore-calendars" })
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
            <UiCard
              class="w-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
              :link="`/calendars/${calendar.shortId}`"
            >
              <UiCardHeader>
                <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
              </UiCardHeader>

              <UiCardContent>
                <p class="flex items-center gap-1">
                  <PhCalendarDots size="24" />
                  <span>{{ $t("entity.calendar.hasXEvents", { count: calendar.eventNb?.[0].count }) }}</span>
                </p>
              </UiCardContent>
            </UiCard>
          </li>
        </ul>
      </Spacing>
    </Spacing>
  </main>
</template>
