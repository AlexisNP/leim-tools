<script lang="ts" setup>
const { categories } = storeToRefs(useCalendar())
</script>

<template>
  <CalendarCategoryTable :categories />
</template>
