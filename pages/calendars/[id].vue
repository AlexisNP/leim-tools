<script lang="ts" setup>
import { PhArrowBendDoubleUpLeft, PhCalendarX, PhCircleNotch } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";
import type { Category } from "~/models/Category";

const route = useRoute()
const shortId = route.params.id

const user = useSupabaseUser()

const {
  data: calendar,
  status: calendarStatus,
  refresh: calRefresh
} = await useLazyFetch<{ data: Calendar }>("/api/calendars/query",
  {
    key: `calendar-${shortId}`,
    query: {
      shortId,
      full: true
    }
  }
)

const {
  data: categories,
  status: categoriesStatus,
  refresh: catRefresh
} = await useLazyFetch<{ data: Category[] }>("/api/calendars/categories/query",
  { key: `categories-${shortId}` }
)

const isLoading = computed(() => calendarStatus.value === "pending" || categoriesStatus.value === "pending")

watch(user, () => {
  calRefresh()
  catRefresh()
})
</script>

<template>
  <div v-if="isLoading" class="h-full w-full grid place-items-center">
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

  <div v-else-if="calendar?.data && categories?.data" class="h-full w-full">
    <Head>
      <Title>{{ calendar.data.name }}</Title>
    </Head>

    <Calendar :calendar-data="calendar.data" :categories="categories.data" />
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

      <UiButton variant="default" class="mt-4 gap-2" as-child>
        <RouterLink to="/explore">
          <PhArrowBendDoubleUpLeft size="24" />

          {{ $t('entity.calendar.backToList') }}
        </RouterLink>
      </UiButton>
    </div>
  </div>
</template>
