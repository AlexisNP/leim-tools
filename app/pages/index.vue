<script lang="ts" setup>
useHead({
  titleTemplate: null
})

definePageMeta({
  layout: "public"
})
</script>

<template>
  <main class="h-full grid place-items-center py-8 px-5 md:px-8">
    <Head>
      <Title>
        TTTools — {{ $t('head.title') }}
      </Title>
      <Meta name="description" :content="$t('head.description')" />
    </Head>

    <div class="py-8 md:py-24 px-4">
      <div class="flow text-center max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold md:font-semibold">
          {{ $t('pages.home.h1') }}
        </h1>
        <p class="text-sm">
          {{ $t('pages.home.tagline') }}
        </p>

        <UserDashboardLink />
      </div>
    </div>
  </main>
</template>
