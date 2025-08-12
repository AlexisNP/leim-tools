<script lang="ts" setup>
import { PhCircleNotch } from '@phosphor-icons/vue'

const { locale } = useI18n()

definePageMeta({
  layout: "public"
})

const { data: page, refresh, status } = useLazyAsyncData(`about-content-${locale}`, () => {
  return queryCollection("sections").path(`/sections/${locale.value}/legal`).first()
})

watch(locale, () => refresh())
</script>

<template>
  <Head>
    <Title>{{ $t("pages.about.title") }}</Title>
  </Head>

  <main class="overflow-y-auto py-8 px-5 md:px-8 grid gap-4 grid-rows-[auto_1fr]">
    <Heading level="h1">
      {{ $t("pages.about.title") }}
    </Heading>

    <div v-if="status === 'pending'" class="grid place-items-center">
      <PhCircleNotch size="50" class="opacity-33 animate-spin"/>
    </div>

    <LazyContentRenderer v-else-if="status === 'success' && page" :value="page" class="content max-w-4xl" />
  </main>
</template>
