<script setup lang="ts">
import type { Category } from "~/models/Category";

defineProps<{
  category: Category
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-700 dark:text-gray-300">
      {{ category.name }}
    </span>
  </div>
</template>
