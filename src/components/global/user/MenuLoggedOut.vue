<script lang="ts" setup>
import { supabase } from '@/supabase/client'
import { Command, CommandItem, CommandList } from '@/components/ui/command'
import type { Session } from '@supabase/supabase-js'

defineProps<{
  session?: Session | null
}>()

async function handleGoogleLogin() {
  try {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>
  <Command>
    <CommandList>
      <CommandItem value="logout" @select="handleGoogleLogin"> Connexion </CommandItem>
    </CommandList>
  </Command>
</template>
