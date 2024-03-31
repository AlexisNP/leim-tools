<script lang="ts" setup>
import { useCalendar } from '@/stores/calendar'

const c = useCalendar()
</script>

<template>
  <main class="container">
    <h1 class="text-3xl font-bold">{{ c }}</h1>
  </main>
</template>
