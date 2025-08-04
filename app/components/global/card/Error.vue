<script lang="ts" setup>
import { PhCloudX } from '@phosphor-icons/vue';
</script>

<template>
  <UiCard class="w-full h-full flex flex-col border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950">
    <template v-if="$slots.title">
      <UiCardHeader class="flex-row items-center gap-2">
        <PhCloudX :size="32"/>

        <UiCardTitle>
          <slot name="title" />
        </UiCardTitle>
      </UiCardHeader>
    </template>
    <template v-if="$slots.content">
      <UiCardContent class="grow grid gap-2">
        <slot name="content" />
      </UiCardContent>
    </template>
  </UiCard>
</template>
