<script lang="ts" setup>
import { PhCalendarX, PhCircleNotch } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";
import type { Category } from "~/models/Category";

const route = useRoute()
const shortId = route.params.id

const user = useSupabaseUser()

const { data: calendarData, pending: calPending, refresh: calRefresh } = await useLazyFetch("/api/calendars/query", { key: `calendar-${shortId}`, query: { shortId, full: true } })
const { data: catData, pending: catPending, refresh: catRefresh } = await useLazyFetch("/api/calendars/categories/query", { key: `categories-${shortId}` })

const cal = computed<Calendar>(() => calendarData?.value?.data as Calendar)
const categories = computed<Category[]>(() => catData?.value?.data as Category[])

watch(user, () => {
  calRefresh()
  catRefresh()
})
</script>

<template>
  <div v-if="calPending || catPending" class="h-full w-full grid place-items-center">
    <Head>
      <Title>{{ $t("entity.calendar.nameSingular") }}</Title>
    </Head>

    <div class="grid gap-2 justify-items-center opacity-50">
      <p>
        {{ $t('entity.calendar.isLoading') }}
      </p>
      <PhCircleNotch size="50" class="animate-spin"/>
    </div>
  </div>

  <div v-else-if="cal && categories" class="h-full w-full">
    <Head>
      <Title>{{ cal.name }}</Title>
    </Head>

    <Calendar :calendar-data="cal" :categories />
  </div>

  <div v-else class="h-full w-full grid place-items-center">
    <Head>
      <Title>{{ $t("entity.calendar.notFound") }}</Title>
    </Head>

    <div class="grid justify-items-center opacity-80">
      <PhCalendarX size="75" class="opacity-60" />

      <Heading level="h1">
        {{ $t("entity.calendar.notFound") }}
      </Heading>

      <p>
        {{ $t('entity.calendar.notFoundDescription') }}
      </p>
    </div>
  </div>
</template>
