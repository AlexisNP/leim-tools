<script lang="ts" setup>
useHead({
  title: 'Dashboard'
})

const { setCurrentMenu } = useUiStore()
setCurrentMenu([])
</script>

<template>
  <main class="p-8">
    <Heading>TTTools</Heading>
  </main>
</template>
