<script lang="ts" setup>
const { locale } = useI18n()

const { data: page, refresh } = await useAsyncData(`about-content-${locale}`, () => {
  return queryCollection("sections").path(`/sections/${locale.value}/legal`).first()
})

watch(locale, () => refresh())
</script>

<template>
  <main class="py-8 px-5 md:px-8 overflow-y-auto">
    <Head>
      <Title>{{ $t("pages.about.title") }}</Title>
    </Head>

    <div class="container max-md:px-0">
      <Spacing size="lg">
        <div class="flex items-center gap-3">
          <div class="md:hidden">
            <SidebarToggle />
          </div>

          <Heading level="h1">
            {{ $t("pages.about.title") }}
          </Heading>
        </div>

        <ContentRenderer v-if="page" :value="page" class="content" />
      </Spacing>
    </div>
  </main>
</template>
