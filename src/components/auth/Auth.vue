<script lang="ts" setup>
import { supabase } from '@/supabase/client'
import Button from '../ui/button/Button.vue'

async function handleGoogleLogin() {
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
}
</script>

<template>
  <Button @click="handleGoogleLogin"> Google </Button>
</template>
