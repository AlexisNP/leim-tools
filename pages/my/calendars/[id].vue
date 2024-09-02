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

const { data: calendarData, pending: calPending } = await useLazyFetch("/api/calendars/query", { key: `calendar-${id}`, query: { id, full: true } })
const { data: catData, pending: catPending } = await useLazyFetch("/api/calendars/categories/query", { key: `categories-${id}` })

const cal = computed<Calendar>(() => calendarData?.value?.data as Calendar)
const categories = computed<Category[]>(() => catData?.value?.data as Category[])
</script>

<template>
  <div v-if="calPending || catPending" class="h-full w-full grid place-items-center">
    <Head>
      <Title>{{ $t("entity.calendar.nameSingular") }}</Title>
    </Head>

    <div class="grid gap-2 justify-items-center opacity-50">
      <p>Chargement du calendrier</p>
      <PhCircleNotch size="50" class="animate-spin"/>
    </div>
  </div>

  <div v-else-if="cal && categories" class="h-full w-full">
    <Head>
      <Title>{{ cal.name }}</Title>
    </Head>

    <Calendar :calendar-data="cal" :categories />
  </div>
</template>
