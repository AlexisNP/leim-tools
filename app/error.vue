<script setup lang="ts">
import type { NuxtError } from "#app";
import { PhArrowBendDoubleUpLeft, PhBugBeetle, PhImageBroken, PhLinkBreak } from "@phosphor-icons/vue";

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

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})

const { statusCode } = props.error!

let titleKey: string
let descriptionKey: string
let subDescriptionKey: string

switch (statusCode) {
  case 404:
    titleKey = "error.notFound.title"
    descriptionKey = "error.notFound.descriptionMain"
    subDescriptionKey = "error.notFound.descriptionSub"
    break;

  case 500:
    titleKey = "error.unknownServer.title"
    descriptionKey = "error.unknownServer.descriptionMain"
    subDescriptionKey = "error.unknownServer.descriptionSub"
    break;

  default:
    titleKey = "error.default.title"
    descriptionKey = "error.default.descriptionMain"
    subDescriptionKey = "error.default.descriptionSub"
    break;
}
</script>

<template>
  <div class="h-screen">
    <div class="h-full grid grid-cols-[auto_1fr] transition-colors">
      <Sidebar />

      <div class="wrapper shadow-body-light dark:shadow-body-dark transition-all">
        <div class="h-full w-full grid place-items-center">
          <Head>
            <Title>{{ $t(titleKey) }}</Title>
          </Head>

          <div class="grid text-center justify-items-center opacity-80">
            <PhImageBroken v-if="statusCode === 404" size="100" class="opacity-60" />
            <PhLinkBreak v-else-if="statusCode === 500" size="100" class="opacity-60" />
            <PhBugBeetle v-else size="100" class="opacity-60" />

            <Heading level="h0">
              {{ $t(titleKey) }}
            </Heading>

            <div class="mt-6 md:text-lg">
              <p>{{ $t(descriptionKey) }}</p>
              <p>{{ $t(subDescriptionKey) }}</p>
            </div>

            <UiButton variant="default" class="mt-6 gap-2" as-child>
              <RouterLink to="/">
                <PhArrowBendDoubleUpLeft size="24" />

                {{ $t('ui.backToHome') }}
              </RouterLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper > * {
  height: 100%;
}
</style>
