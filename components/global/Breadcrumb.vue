<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";

const route = useRoute()

export type BreadcrumbItem = {
  label?: string;
  translateKey?: string;
  to?: string;
}

defineProps<{
  items?: BreadcrumbItem[];
}>()
</script>

<template>
  <div class="flex gap-3 items-center">
    <div class="md:hidden">
      <SidebarToggle />
    </div>

    <UiBreadcrumb>
      <UiBreadcrumbList>
        <UiBreadcrumbItem v-if="route.path !== '/my'">
          <UiBreadcrumbLink as-child>
            <NuxtLink to="/my">
              {{ $t("breadcrumbs.profile") }}
            </NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbItem v-else>
          <UiBreadcrumbPage>
            {{ $t("breadcrumbs.profile") }}
          </UiBreadcrumbPage>
        </UiBreadcrumbItem>

        <template v-for="(item, index) in items" :key="index">
          <UiBreadcrumbSeparator>
            <PhCaretRight />
          </UiBreadcrumbSeparator>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink v-if="item.to" as-child>
              <NuxtLink :to="item.to">
                <template v-if="item.label">
                  {{ item.label }}
                </template>
                <template v-else>
                  {{ $t(`breadcrumbs.${item.translateKey}`) }}
                </template>
              </NuxtLink>
            </UiBreadcrumbLink>
            <UiBreadcrumbPage v-else>
              <template v-if="item.label">
                {{ item.label }}
              </template>
              <template v-else>
                {{ $t(`breadcrumbs.${item.translateKey}`) }}
              </template>
            </UiBreadcrumbPage>
          </UiBreadcrumbItem>
        </template>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  </div>
</template>
