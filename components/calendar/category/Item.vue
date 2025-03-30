<script setup lang="ts">
import type { Category } from "~/models/Category";

defineProps<{
  category: Category
}>()
</script>

<template>
  <UiButton variant="secondary" size="sm" class="w-full text-left">
    {{ category }}
  </UiButton>
</template>
