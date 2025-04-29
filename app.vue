<script setup lang="ts">
import { ConfigProvider } from "radix-vue"
import { cn } from "./lib/utils";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — TTTools` : "TTTools";
  },
  meta: [
    { name: "charset", content: "UTF-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "author", content: "Alexis Pelé" },
    { name: "generator", content: "Nuxt" },
    { name: "msapplication-TileColor", content: "00aba9" },
    { name: "theme-color", content: "00aba9" },
    { name: "og:type", content: "tabletop-tools" },
    { name: "og:url", content: "ttt.alexcreates.fr" },
    { name: "robots", content: "noindex, nofollow"}
  ],
  link: [
    { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", type: "image/png", href: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", type: "image/png", href: "/favicon-16x16.png" },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#6595b4" },
  ]
})

const useIdFunction = () => useId()

const { isSidebarOpened } = storeToRefs(useUiStore())
</script>

<template>
  <div class="h-screen">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <ConfigProvider :use-id="useIdFunction">
        <div
          class="h-full grid md:grid-cols-[auto_1fr] dark:bg-black shadow-body-light dark:shadow-body-dark transition-colors after:absolute after:transition-colors"
          :class="cn({
            'max-md:after:bg-transparent': isSidebarOpened,
            'has-sidebar max-md:after:bg-black/20 md:after:opacity-0 md:after:pointer-events-none': isSidebarOpened
          })"
        >
          <Sidebar />

          <div
            class="wrapper max-h-screen transition-all"
          >
            <NuxtPage />
          </div>
        </div>
      </ConfigProvider>
    </NuxtLayout>

    <ClientOnly>
      <UiToaster />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.wrapper > * {
  height: 100%;
}

.has-sidebar {
  position: relative;
  isolation: isolate;

  &::after {
    content: '';
    display: block;
    position: fixed;
    inset: 0;
    z-index: 30;
  }
}
</style>
