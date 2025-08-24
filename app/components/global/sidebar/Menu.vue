<script setup lang="ts">
import { PanelsLeftBottom } from 'lucide-vue-next';

</script>

<template>
  <menu class="min-w-32 pt-16 flex flex-col gap-0.5">
    <li class="w-full">
      <UiButton
        variant="ghost"
        size="sm"
        class="h-8 gap-1.5 hover:bg-secondary w-full justify-start"
        as-child
      >
        <NuxtLink to="/my" active-class="active-link" exact-active-class="exact-link">
          <PanelsLeftBottom :size="18" />

          <span class="text-[.9em]">
            {{ $t('ui.sidebarMenu.projects') }}
          </span>
        </NuxtLink>
      </UiButton>
    </li>
  </menu>
</template>

<style lang="scss" scoped>
.active-link {
  color: var(--color-secondary-foreground);
  background-color: var(--color-secondary);

  &:hover {
    background-color: color-mix(in srgb, var(--color-primary) 33%, transparent);
  }
}

.exact-link {
  color: var(--color-primary-foreground);
  background-color: color-mix(in srgb, var(--color-primary) 66%, transparent);
  cursor: initial;

  &:hover {
    background-color: color-mix(in srgb, var(--color-primary) 66%, transparent);
  }
}

.dark .exact-link {
  background-color: var(--color-primary);
}
</style>
