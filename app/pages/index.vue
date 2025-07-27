<script lang="ts" setup>
useHead({
  titleTemplate: null
})

definePageMeta({
  middleware: ["reset-menu"]
})
</script>

<template>
  <main class="py-8 px-5 md:px-8">
    <Head>
      <Title>
        TTTools — {{ $t('head.title') }}
      </Title>
      <Meta name="description" :content="$t('head.description')" />
    </Head>

    <Heading level="h1">TTTools</Heading>
  </main>
</template>
