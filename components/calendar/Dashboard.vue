<script lang="ts" setup>
const route = useRoute()
const worldId = route.params.id

const { data: calendar } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)
</script>

<template>
  <pre>
    {{ calendar }}
  </pre>
</template>
