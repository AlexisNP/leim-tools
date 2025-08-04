<script lang="ts" setup>
const { lineNb = 3 } = defineProps<{
  lineNb?: number
}>()
</script>

<template>
  <UiCard class="w-full h-full flex flex-col">
    <UiCardHeader>
      <UiCardTitle>
        <UiSkeleton class="w-2/3 max-w-full h-8" />
      </UiCardTitle>
    </UiCardHeader>
    <UiCardContent class="grow grid gap-2">
      <UiSkeleton class="w-full max-w-full h-6" />
      <template v-for="(l, i) in lineNb" :key="i">
        <UiSkeleton class="max-w-full h-6" :style="`width: ${Math.floor(Math.random() * 100) + 1}%`" />
      </template>
    </UiCardContent>
  </UiCard>
</template>
