<script lang="ts" setup>
import { useAuth } from '@/stores/AuthStore'

const { sessionToken } = useAuth()
</script>

<template>
  <pre class="text-[.6em]">
    {{ sessionToken }}
  </pre>
</template>
