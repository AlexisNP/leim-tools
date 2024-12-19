<script lang="ts" setup>
import type { Calendar } from "~/models/CalendarConfig";

const { data } = await useFetch("/api/calendars/query")

const availableCalendars = data.value?.data as Calendar[]
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

        <ul v-if="availableCalendars && availableCalendars?.length > 0" class="grid md:grid-cols-3 gap-2">
          <li v-for="calendar in availableCalendars" :key="calendar.shortId">
            <UiCard
              class="w-full transition-all hover:bg-slate-50 dark:bg-gray-950 dark:hover:bg-indigo-950 dark:focus-within:outline-gray-900"
              :link="`/calendars/${calendar.shortId}`"
            >
              <UiCardHeader>
                <UiCardTitle class="text-xl pr-12">{{ calendar.name }}</UiCardTitle>
              </UiCardHeader>

              <UiCardContent>
                <p class="italic">Description future (ou alors des informations sur le nb d'évènements)</p>
              </UiCardContent>
            </UiCard>
          </li>
        </ul>
      </Spacing>
    </Spacing>
  </main>
</template>
