<script lang="ts" setup>
const route = useRoute()
const worldId = route.params.id

const { months } = storeToRefs(useCalendar())

const { data: res } = await useLazyFetch(`/api/calendars/query?world_id=${worldId}`)

if (res.value?.data?.months) {
  months.value = res.value?.data?.months
}
</script>

<template>
  <Calendar />
</template>
