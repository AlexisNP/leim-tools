<script lang="ts" setup>
import { useCalendarEvents } from '@/stores/EventStore'

const { currentEvents } = useCalendarEvents()
</script>

<template>
  <div>Century</div>
</template>
