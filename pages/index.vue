<script lang="ts" setup>
useHead({
  titleTemplate: null
})
</script>

<template>
  <main class="p-8">
    <Head>
      <Title>
        TTTools — {{ $t('head.title') }}
      </Title>
      <Meta name="description" :content="$t('head.description')" />
    </Head>

    <Heading level="h1">TTTools</Heading>
  </main>
</template>
