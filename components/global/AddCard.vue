<script lang="ts" setup>
import { PhPlusCircle } from "@phosphor-icons/vue";

const emit = defineEmits(["on-click"])
</script>

<template>
  <UiCard
    class="h-full md:w-fit transition-all bg-transparent hover:text-slate-900 text-slate-500 dark:hover:text-slate-100 dark:text-slate-500 dark:focus-within:outline-gray-900 hover:-translate-y-0"
    has-click
    @on-click="emit('on-click')"
  >
    <UiCardHeader class="h-full justify-center items-center text-center gap-0">
      <PhPlusCircle size="38" weight="fill" />

      <UiCardTitle class="text-xl">
        <slot />
      </UiCardTitle>
    </UiCardHeader>
  </UiCard>
</template>
