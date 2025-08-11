<template>
  <header role="banner" class="sticky top-0 border-b-1 border-border py-4 px-2 z-50 backdrop-blur">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="md:flex-1 flex justify-start" />

        <nav class="md:flex-1">
          <menu class="text-sm flex items-center justify-center gap-4">
            <li>
              <NuxtLink to="/" class="block p-1 font-medium text-foreground/70 hover:text-foreground transition-colors" active-class="text-primary">
                {{ $t('breadcrumbs.home') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/explore" class="block p-1 font-medium text-foreground/70 hover:text-foreground transition-colors" active-class="text-primary">
                {{ $t('pages.explore.menuLabel') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="block p-1 font-medium text-foreground/70 hover:text-foreground transition-colors" active-class="text-primary">
                {{ $t('pages.about.menuLabel') }}
              </NuxtLink>
            </li>
          </menu>
        </nav>

        <div class="md:flex-1 flex justify-end">
          <UserDashboardLink size="xs" />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: color-mix(in srgb, var(--color-background) 75%, transparent);
}
</style>
