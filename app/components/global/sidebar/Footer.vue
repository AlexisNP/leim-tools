<script setup lang="ts">
import { PhInfo } from '@phosphor-icons/vue';
</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <div class="grow">
      <UserCTA />
    </div>

    <UiButton size="icon" class="size-8 hover:bg-secondary hover:text-secondary-foreground" variant="ghost" as-child>
      <NuxtLink to="/about">
        <PhInfo size="18" />
      </NuxtLink>
    </UiButton>
  </div>
</template>

