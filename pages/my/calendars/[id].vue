<script lang="ts" setup>
import { PhArrowBendDoubleUpLeft, PhCalendarX, PhCircleNotch } from "@phosphor-icons/vue";
import type { Calendar } from "~/models/CalendarConfig";
import type { Category } from "~/models/Category";

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

const route = useRoute()
const id = route.params.id

const {
  data: calendar,
  status: calendarStatus
} = await useLazyFetch<{ data: Calendar }>("/api/calendars/query",
  {
    key: "active-calendar",
    query: {
      id,
      full: true
    }
  }
)

const {
  data: categories,
  status: categoriesStatus
} = await useLazyFetch<{ data: Category[] }>("/api/calendars/categories/query",
  { key: "active-categories" }
)

const isLoading = computed(() => calendarStatus.value === "pending" || categoriesStatus.value === "pending")
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

    <div class="h-full grid grid-rows-[auto_1fr] pt-8 gap-y-2">
      <div class="px-8">
        <Breadcrumb
          v-if="calendar.data.world"
          :items="[
            { label: calendar.data.world.name, to: `/my/worlds/${calendar.data.world.id}` },
            { label: calendar.data.name },
          ]"
        />
      </div>

      <Calendar :calendar-data="calendar.data" :categories="categories.data" />
    </div>
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
        <RouterLink to="/my">
          <PhArrowBendDoubleUpLeft size="24" />

          {{ $t('entity.calendar.backToList') }}
        </RouterLink>
      </UiButton>
  </div>
</div></template>
