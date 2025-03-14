<script lang="ts" setup>
type HeadingLevel = "h0" | "h1" | "h2" | "h3"

interface HeadingProps {
  level?: HeadingLevel
}

withDefaults(defineProps<HeadingProps>(), {
  level: "h2"
})
</script>

<template>
  <h1 v-if="level === 'h0'" class="text-4xl md:text-6xl font-bold flex">
    <slot />
  </h1>
  <h1 v-else-if="level === 'h1'" class="text-2xl md:text-4xl font-bold flex">
    <slot />
  </h1>
  <h2 v-else-if="level === 'h2'" class="text-xl md:text-2xl font-bold flex">
    <slot />
  </h2>
  <h3 v-if="level === 'h3'" class="text-lg md:text-xl font-bold flex">
    <slot />
  </h3>
</template>
