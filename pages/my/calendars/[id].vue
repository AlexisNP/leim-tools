<script lang="ts" setup>
import { PhCircleNotch } from "@phosphor-icons/vue";
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
    key: `calendar-${id}`,
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
  { key: `categories-${id}` }
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

  <div v-else-if="calendar && categories" class="h-full w-full">
    <Head>
      <Title>{{ calendar.data.name }}</Title>
    </Head>

    <Calendar :calendar-data="calendar.data" :categories="categories.data" />
  </div>
</template>
