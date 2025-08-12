<script lang="ts" setup>
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const profileUrl: string = `${useRequestURL().origin}/my/`

interface Props extends PrimitiveProps {
  size?: ButtonVariants["size"]
}

defineProps<Props>()

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
  <TransitionGroup name="fade-group" appear>
    <UiButton v-if="user" :size>
      <NuxtLink to="/my">
        Dashboard
      </NuxtLink>
    </UiButton>
    <UiButton v-else @click="handleGoogleLogin" :size>
      Log in
    </UiButton>
  </TransitionGroup>
</template>
