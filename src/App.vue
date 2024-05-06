<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { RouterView } from 'vue-router'
import { useAuth } from './stores/AuthStore'

useDark()
useAuth()
</script>

<template>
  <div class="h-screen">
    <RouterView />
  </div>
</template>
