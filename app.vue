<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — TTTools` : 'TTTools';
  }
})

const useIdFunction = () => useId()
</script>

<template>
  <div class="h-screen">
    <NuxtLayout>
      <ConfigProvider :use-id="useIdFunction">
        <NuxtPage/>
      </ConfigProvider>
    </NuxtLayout>
  </div>
</template>
