<script lang="ts" setup>
const { categories } = storeToRefs(useCalendar())
</script>

<template>
  <CalendarCategoryList :categories />
</template>
