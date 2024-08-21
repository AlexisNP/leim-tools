<script lang="ts" setup>
import { PhCircleNotch } from '@phosphor-icons/vue';

useHead({
  title: 'Calendrier'
})
definePageMeta({
  middleware: ['auth-guard']
})

const user = useSupabaseUser()
// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})
</script>

<template>
  <Suspense>
    <LazyCalendar />

    <template #fallback>
      <div class="h-full w-full grid place-items-center">
        <div class="grid gap-2 justify-items-center opacity-50">
          <p>Chargement du calendrier</p>
          <PhCircleNotch size="50" class="animate-spin"/>
        </div>
      </div>
    </template>
  </Suspense>
</template>
