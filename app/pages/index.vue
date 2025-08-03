<script lang="ts" setup>
useHead({
  titleTemplate: null
})

definePageMeta({
  layout: "public"
})

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const profileUrl: string = `${useRequestURL().origin}/my/`

async function handleGoogleLogin() {
  const { error } = await auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent"
      },
      redirectTo: profileUrl
    }
  })

  if (error) {
    console.log(error.message)
  }
}
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
      <div class="flow text-center max-w-2xl mx-auto">
        <h1 class="text-3xl md:text-5xl font-bold md:font-semibold">A home for your creativity</h1>
        <p class="text-sm">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eos rem accusantium voluptates? Inventore dolorum reprehenderit quibusdam consequatur, totam iusto velit neque dolor dicta possimus cum, deleniti, saepe expedita culpa!</p>

        <TransitionGroup name="fade-group" appear>
          <UiButton v-if="user" as-child>
            <NuxtLink to="/my">
              Dashboard
            </NuxtLink>
          </UiButton>
          <UiButton v-else @click="handleGoogleLogin">
            Log in
          </UiButton>
        </TransitionGroup>
      </div>
    </div>
  </main>
</template>
