<script lang="ts" setup>
const user = useSupabaseUser()

useHead({
  title: 'Profil'
})

definePageMeta({
  middleware: ['auth-guard']
})

// Redirect user back home when they log out on the page
watch(user, (n, _o) => {
  if (!n) {
    navigateTo('/')
  }
})

const { setCurrentMenu } = useUiStore()
setCurrentMenu([])
</script>

<template>
  <ProfileDashboard />
</template>
