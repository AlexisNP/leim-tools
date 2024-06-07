<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — TTTools` : 'TTTools';
  },
  meta: [
    { name: "charset", content: "UTF-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "author", content: "Alexis Pelé" },
    { name: "description", content: "Tools destined to players and game master, helping them visualize their worlds better." },
    { name: "generator", content: "Nuxt" },
    { name: "msapplication-TileColor", content: "00aba9" },
    { name: "theme-color", content: "00aba9" },
    { name: "og:type", content: "tabletop-tools" },
    { name: "og:url", content: "ttt.alexcreates.fr" },
    { name: 'robots', content: 'noindex, nofollow'}
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: "76x76", href: '/apple-touch-icon.png' },
    { rel: 'icon', sizes: "32x32", type: 'image/png', href: '/favicon-32x32.png' },
    { rel: 'icon', sizes: "16x16", type: 'image/png', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#6595b4' },
  ]
})

const useIdFunction = () => useId()
</script>

<template>
  <div class="h-screen">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <ConfigProvider :use-id="useIdFunction">
        <div class="h-full grid grid-cols-[auto_1fr]">
          <Sidebar />

          <NuxtPage/>
        </div>
      </ConfigProvider>
    </NuxtLayout>
  </div>
</template>
