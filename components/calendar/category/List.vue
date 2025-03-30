<script setup lang="ts">
import type { Category } from "~/models/Category";

defineProps<{
  categories: Category[]
}>()
</script>

<template>
  <ul>
    <li v-for="category in categories" :key="category.id">
      <CalendarCategoryItem :category="category" />
    </li>
  </ul>
</template>
