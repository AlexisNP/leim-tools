<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'

const dark = useDark()
</script>

<template>
  <div class="h-screen">
    <RouterView />
  </div>
</template>
