<script lang="ts" setup>
const { locale } = useI18n()

const { data: page, refresh } = await useAsyncData(locale, () => {
  return queryCollection("sections").path(`/sections/${locale.value}/legal`).first()
})

watch(locale, () => refresh())
</script>

<template>
  <main class="py-8 px-5 md:px-8 overflow-y-auto">
    <Head>
      <Title>{{ $t("pages.about.title") }}</Title>
    </Head>

    <div class="container">
      <Spacing size="lg">
        <Heading level="h1">
          {{ $t("pages.about.title") }}
        </Heading>

        <ContentRenderer v-if="page" :value="page" class="content" />
      </Spacing>
    </div>
  </main>
</template>
